"use client";

import { useState, useEffect } from "react";

interface TreeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  depth: number;
  parentId: string | null;
  isLeft: boolean;
}

// Build the n=8 FFT recursion tree
const treeNodes: TreeNode[] = [
  // Depth 0
  { id: "d0-0", label: "0–7", x: 200, y: 30, depth: 0, parentId: null, isLeft: true },
  // Depth 1
  { id: "d1-0", label: "0,2,4,6", x: 100, y: 100, depth: 1, parentId: "d0-0", isLeft: true },
  { id: "d1-1", label: "1,3,5,7", x: 300, y: 100, depth: 1, parentId: "d0-0", isLeft: false },
  // Depth 2
  { id: "d2-0", label: "0,4", x: 50,  y: 170, depth: 2, parentId: "d1-0", isLeft: true },
  { id: "d2-1", label: "2,6", x: 150, y: 170, depth: 2, parentId: "d1-0", isLeft: false },
  { id: "d2-2", label: "1,5", x: 250, y: 170, depth: 2, parentId: "d1-1", isLeft: true },
  { id: "d2-3", label: "3,7", x: 350, y: 170, depth: 2, parentId: "d1-1", isLeft: false },
  // Depth 3 (leaves)
  { id: "d3-0", label: "0",   x: 25,  y: 240, depth: 3, parentId: "d2-0", isLeft: true },
  { id: "d3-1", label: "4",   x: 75,  y: 240, depth: 3, parentId: "d2-0", isLeft: false },
  { id: "d3-2", label: "2",   x: 125, y: 240, depth: 3, parentId: "d2-1", isLeft: true },
  { id: "d3-3", label: "6",   x: 175, y: 240, depth: 3, parentId: "d2-1", isLeft: false },
  { id: "d3-4", label: "1",   x: 225, y: 240, depth: 3, parentId: "d2-2", isLeft: true },
  { id: "d3-5", label: "5",   x: 275, y: 240, depth: 3, parentId: "d2-2", isLeft: false },
  { id: "d3-6", label: "3",   x: 325, y: 240, depth: 3, parentId: "d2-3", isLeft: true },
  { id: "d3-7", label: "7",   x: 375, y: 240, depth: 3, parentId: "d2-3", isLeft: false },
];

const nodeById = new Map(treeNodes.map((n) => [n.id, n]));

const depthLabels = [
  "Depth 0 — full input [0,1,2,3,4,5,6,7]",
  "Depth 1 — split even [0,2,4,6] and odd [1,3,5,7] indices",
  "Depth 2 — split again into pairs",
  "Depth 3 — base case: single-element DFTs (trivial)",
];

export function Module3RecursionTree() {
  const [currentDepth, setCurrentDepth] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentDepth((d) => (d + 1) % 4);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const BOX_W = 44;
  const BOX_H = 22;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">
          Module 3 — Cooley-Tukey Recursion Tree
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          FFT for n=8: recursively splitting even and odd indices until base case.
        </p>
      </div>

      <svg
        viewBox="0 0 400 310"
        className="w-full rounded-xl bg-slate-950/60"
        aria-label="FFT recursion tree for n=8"
      >
        {/* Draw edges first (behind nodes) */}
        {treeNodes.map((node) => {
          if (!node.parentId) return null;
          const parent = nodeById.get(node.parentId);
          if (!parent) return null;
          const isLeft = node.isLeft;
          const edgeColor = isLeft ? "rgba(59,130,246,0.45)" : "rgba(168,85,247,0.45)";
          return (
            <line
              key={`edge-${node.id}`}
              x1={parent.x}
              y1={parent.y + BOX_H / 2}
              x2={node.x}
              y2={node.y - BOX_H / 2}
              stroke={edgeColor}
              strokeWidth={1.2}
            />
          );
        })}

        {/* Draw nodes */}
        {treeNodes.map((node) => {
          const isActive = node.depth === currentDepth;
          const isDimmed = node.depth > currentDepth;
          return (
            <g key={node.id}>
              <rect
                x={node.x - BOX_W / 2}
                y={node.y - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx={4}
                fill={isActive ? "#1d4ed8" : isDimmed ? "#0f172a" : "#1e293b"}
                stroke={isActive ? "#60a5fa" : isDimmed ? "#1e293b" : "#334155"}
                strokeWidth={isActive ? 1.5 : 0.8}
                opacity={isDimmed ? 0.35 : 1}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fontSize={node.depth === 3 ? 11 : 9}
                fill={isActive ? "#bfdbfe" : isDimmed ? "#334155" : "#94a3b8"}
                fontFamily="monospace"
                opacity={isDimmed ? 0.35 : 1}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g>
          <rect x={10} y={275} width={10} height={10} rx={2} fill="rgba(59,130,246,0.45)" />
          <text x={24} y={284} fontSize={8} fill="#64748b">Even split</text>
          <rect x={80} y={275} width={10} height={10} rx={2} fill="rgba(168,85,247,0.45)" />
          <text x={94} y={284} fontSize={8} fill="#64748b">Odd split</text>
        </g>
      </svg>

      <div className="rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-center">
        <span className="text-xs font-mono text-blue-300">
          {depthLabels[currentDepth]}
        </span>
      </div>

      {/* Depth indicator dots */}
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3].map((d) => (
          <button
            key={d}
            onClick={() => setCurrentDepth(d)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              d === currentDepth ? "bg-blue-500" : "bg-slate-700 hover:bg-slate-600"
            }`}
            aria-label={`Go to depth ${d}`}
          />
        ))}
      </div>
    </div>
  );
}
