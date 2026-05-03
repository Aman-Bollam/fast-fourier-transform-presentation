import type { TraceStep, RecursiveStep, IterativeStep } from "@/lib/fftTrace";

interface TraceVisualizationProps {
  step: TraceStep;
  mode: "recursive" | "iterative";
}

export function TraceVisualization({ step, mode }: TraceVisualizationProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Visualization</p>
      </div>
      <div className="p-4">
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

const NODE_W = 44;
const NODE_H = 20;

function nodeY(depth: number): number {
  return depth * 75 + 20;
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
    <svg viewBox="0 0 400 320" className="w-full">
      {/* Edges */}
      {EDGES.map(([fromId, toId], edgeIdx) => {
        const from = nodeMap.get(fromId)!;
        const to = nodeMap.get(toId)!;
        // Left child = even, right child = odd — determined by x position relative to parent
        const isLeft = to.x < from.x;
        const stroke = isLeft ? "rgba(59,130,246,0.4)" : "rgba(168,85,247,0.4)";
        const x1 = from.x;
        const y1 = nodeY(from.depth) + NODE_H;
        const x2 = to.x;
        const y2 = nodeY(to.depth);
        return (
          <line
            key={edgeIdx}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke={stroke}
            strokeWidth={1.5}
          />
        );
      })}

      {/* Nodes */}
      {TREE_NODES.map(node => {
        const active = isActive(node);
        const cx = node.x - NODE_W / 2;
        const cy = nodeY(node.depth);
        return (
          <g key={node.id}>
            <rect
              x={cx} y={cy}
              width={NODE_W} height={NODE_H}
              rx={4}
              fill={active ? "rgba(59,130,246,0.20)" : "rgba(30,41,59,0.60)"}
              stroke={active ? "#3b82f6" : "#334155"}
              strokeWidth={active ? 2 : 1}
            />
            <text
              x={node.x}
              y={cy + NODE_H / 2 + 4}
              textAnchor="middle"
              fontSize={8}
              fill={active ? "#bfdbfe" : "#94a3b8"}
            >
              n={node.strideLength}
            </text>
          </g>
        );
      })}

      {/* Depth labels */}
      {[0, 1, 2, 3].map(d => (
        <text
          key={d}
          x={398}
          y={nodeY(d) + NODE_H / 2 + 4}
          textAnchor="end"
          fontSize={8}
          fill="#475569"
        >
          d={d}
        </text>
      ))}
    </svg>
  );
}

function IterativeArrayViz({ step }: { step: IterativeStep }) {
  return (
    <svg viewBox="0 0 400 120" className="w-full">
      {step.array.map((c, i) => {
        const isActive =
          step.activeIndices !== null &&
          (i === step.activeIndices[0] || i === step.activeIndices[1]);
        const x = i * 48 + 8;
        return (
          <g key={i}>
            <rect
              x={x} y={20} width={40} height={36}
              rx={4}
              fill={isActive ? "#1d4ed8" : "#1e293b"}
              stroke={isActive ? "#3b82f6" : "#334155"}
              strokeWidth={isActive ? 2 : 1}
            />
            <text x={x + 20} y={35} textAnchor="middle" fontSize={9} fill={isActive ? "#bfdbfe" : "#94a3b8"}>
              {c.re.toFixed(2)}
            </text>
            <text x={x + 20} y={48} textAnchor="middle" fontSize={8} fill={isActive ? "#93c5fd" : "#64748b"}>
              {c.im >= 0 ? `+${c.im.toFixed(2)}i` : `${c.im.toFixed(2)}i`}
            </text>
            <text x={x + 20} y={72} textAnchor="middle" fontSize={9} fill="#475569">
              [{i}]
            </text>
          </g>
        );
      })}

      {/* Arc between active pair */}
      {step.activeIndices !== null && (() => {
        const [i1, i2] = step.activeIndices;
        const x1 = i1 * 48 + 28;
        const x2 = i2 * 48 + 28;
        const midX = (x1 + x2) / 2;
        return (
          <path
            d={`M ${x1} 20 Q ${midX} 5 ${x2} 20`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />
        );
      })()}
    </svg>
  );
}
