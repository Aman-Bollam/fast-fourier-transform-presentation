import type { TraceStep, RecursiveStep, IterativeStep } from "@/lib/fftTrace";

interface TraceVisualizationProps {
  step: TraceStep;
  mode: "recursive" | "iterative";
}

export function TraceVisualization({ step, mode }: TraceVisualizationProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/45 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      <div className="border-b border-slate-800/80 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Visualization</p>
      </div>
      <div className="p-5">
        {mode === "recursive"
          ? <RecursiveTreeViz step={step as RecursiveStep} />
          : <IterativeArrayViz step={step as IterativeStep} />
        }
      </div>
    </div>
  );
}

// ─── Static tree structure ────────────────────────────────────────────────────

interface TreeNode {
  id: string;
  depth: number;
  x: number;
  indices: number[];
  startIndex: number;
  strideLength: number;
}

const TREE_NODES: TreeNode[] = [
  // depth 0
  { id: "d0n0", depth: 0, x: 200, indices: [0, 1, 2, 3, 4, 5, 6, 7], startIndex: 0, strideLength: 8 },
  // depth 1
  { id: "d1n0", depth: 1, x: 100, indices: [0, 2, 4, 6], startIndex: 0, strideLength: 4 },
  { id: "d1n1", depth: 1, x: 300, indices: [1, 3, 5, 7], startIndex: 4, strideLength: 4 },
  // depth 2
  { id: "d2n0", depth: 2, x: 50,  indices: [0, 4], startIndex: 0, strideLength: 2 },
  { id: "d2n1", depth: 2, x: 150, indices: [2, 6], startIndex: 2, strideLength: 2 },
  { id: "d2n2", depth: 2, x: 250, indices: [1, 5], startIndex: 4, strideLength: 2 },
  { id: "d2n3", depth: 2, x: 350, indices: [3, 7], startIndex: 6, strideLength: 2 },
  // depth 3
  { id: "d3n0", depth: 3, x: 25,  indices: [0], startIndex: 0, strideLength: 1 },
  { id: "d3n1", depth: 3, x: 75,  indices: [4], startIndex: 1, strideLength: 1 },
  { id: "d3n2", depth: 3, x: 125, indices: [2], startIndex: 2, strideLength: 1 },
  { id: "d3n3", depth: 3, x: 175, indices: [6], startIndex: 3, strideLength: 1 },
  { id: "d3n4", depth: 3, x: 225, indices: [1], startIndex: 4, strideLength: 1 },
  { id: "d3n5", depth: 3, x: 275, indices: [5], startIndex: 5, strideLength: 1 },
  { id: "d3n6", depth: 3, x: 325, indices: [3], startIndex: 6, strideLength: 1 },
  { id: "d3n7", depth: 3, x: 375, indices: [7], startIndex: 7, strideLength: 1 },
];

const EDGES: [string, string][] = [
  // depth 0 → 1
  ["d0n0", "d1n0"], ["d0n0", "d1n1"],
  // depth 1 → 2
  ["d1n0", "d2n0"], ["d1n0", "d2n1"],
  ["d1n1", "d2n2"], ["d1n1", "d2n3"],
  // depth 2 → 3
  ["d2n0", "d3n0"], ["d2n0", "d3n1"],
  ["d2n1", "d3n2"], ["d2n1", "d3n3"],
  ["d2n2", "d3n4"], ["d2n2", "d3n5"],
  ["d2n3", "d3n6"], ["d2n3", "d3n7"],
];

const NODE_W = 58;
const NODE_H = 34;
const LEAF_NODE_W = 42;

function nodeY(depth: number): number {
  return depth * 74 + 24;
}

function RecursiveTreeViz({ step }: { step: RecursiveStep }) {
  const nodeMap = new Map(TREE_NODES.map(n => [n.id, n]));

  function isActive(node: TreeNode): boolean {
    return (
      node.depth === step.depth &&
      step.startIndex >= node.startIndex &&
      step.startIndex < node.startIndex + node.strideLength
    );
  }

  return (
    <svg viewBox="0 0 430 330" className="w-full">
      <defs>
        <filter id="activeTraceGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Edges */}
      {EDGES.map(([fromId, toId], edgeIdx) => {
        const from = nodeMap.get(fromId)!;
        const to = nodeMap.get(toId)!;
        // Left child = even, right child = odd — determined by x position relative to parent
        const isLeft = to.x < from.x;
        const stroke = isLeft ? "rgba(59,130,246,0.62)" : "rgba(34,211,238,0.42)";
        const x1 = from.x + 15;
        const y1 = nodeY(from.depth) + NODE_H;
        const x2 = to.x + 15;
        const y2 = nodeY(to.depth);
        return (
          <line
            key={edgeIdx}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke={stroke}
            strokeWidth={1.4}
          />
        );
      })}

      {/* Nodes */}
      {TREE_NODES.map(node => {
        const active = isActive(node);
        const nodeW = node.depth === 3 ? LEAF_NODE_W : NODE_W;
        const labelSize = node.depth === 3 ? 7.5 : 8;
        const subLabelSize = node.depth === 3 ? 6.5 : 7;
        const cx = node.x + 15 - nodeW / 2;
        const cy = nodeY(node.depth);
        return (
          <g key={node.id}>
            <rect
              x={cx} y={cy}
              width={nodeW} height={NODE_H}
              rx={5}
              fill={active ? "rgba(37,99,235,0.22)" : node.depth === 3 ? "rgba(20,184,166,0.16)" : "rgba(59,130,246,0.10)"}
              stroke={active ? "#38bdf8" : node.depth === 3 ? "rgba(45,212,191,0.62)" : "rgba(96,165,250,0.42)"}
              strokeWidth={active ? 2 : 1}
              filter={active ? "url(#activeTraceGlow)" : undefined}
            />
            <text
              x={node.x + 15}
              y={cy + 14}
              textAnchor="middle"
              fontSize={labelSize}
              fill={active ? "#e0f2fe" : "#cbd5e1"}
            >
              n = {node.strideLength}
            </text>
            <text
              x={node.x + 15}
              y={cy + 26}
              textAnchor="middle"
              fontSize={subLabelSize}
              fill={active ? "#bae6fd" : "#94a3b8"}
            >
              start = {node.startIndex}
            </text>
          </g>
        );
      })}

      {/* Depth labels */}
      {[0, 1, 2, 3].map(d => (
        <text
          key={d}
          x={425}
          y={nodeY(d) + NODE_H / 2 + 4}
          textAnchor="end"
          fontSize={8}
          fill="#94a3b8"
        >
          d={d}
        </text>
      ))}
    </svg>
  );
}

function IterativeArrayViz({ step }: { step: IterativeStep }) {
  return (
    <svg viewBox="0 0 430 140" className="w-full">
      {step.array.map((c, i) => {
        const isActive =
          step.activeIndices !== null &&
          (i === step.activeIndices[0] || i === step.activeIndices[1]);
        const x = i * 50 + 14;
        return (
          <g key={i}>
            <rect
              x={x} y={26} width={42} height={40}
              rx={5}
              fill={isActive ? "rgba(37,99,235,0.35)" : "rgba(15,23,42,0.72)"}
              stroke={isActive ? "#38bdf8" : "rgba(51,65,85,0.9)"}
              strokeWidth={isActive ? 2 : 1}
            />
            <text x={x + 21} y={42} textAnchor="middle" fontSize={9} fill={isActive ? "#e0f2fe" : "#94a3b8"}>
              {c.re.toFixed(2)}
            </text>
            <text x={x + 21} y={56} textAnchor="middle" fontSize={8} fill={isActive ? "#93c5fd" : "#64748b"}>
              {c.im >= 0 ? `+${c.im.toFixed(2)}i` : `${c.im.toFixed(2)}i`}
            </text>
            <text x={x + 21} y={86} textAnchor="middle" fontSize={9} fill="#64748b">
              [{i}]
            </text>
          </g>
        );
      })}

      {/* Arc between active pair */}
      {step.activeIndices !== null && (() => {
        const [i1, i2] = step.activeIndices;
        const x1 = i1 * 50 + 35;
        const x2 = i2 * 50 + 35;
        const midX = (x1 + x2) / 2;
        return (
          <path
            d={`M ${x1} 26 Q ${midX} 6 ${x2} 26`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />
        );
      })()}
    </svg>
  );
}
