"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SIZES = [64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536];

const DATA = SIZES.map((n) => {
  const log2n = Math.log2(n);
  return {
    n: `2^${Math.round(log2n)}`,
    "Naive O(n²)": Math.round(n * n),
    "Recursive FFT": Math.round(4 * n * log2n), // ~4 real ops per complex butterfly
    "Iterative FFT": Math.round(3 * n * log2n),  // ~same, lower constant (cache-friendly)
  };
});

function fmtOps(v: number): string {
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(0)}K`;
  return String(v);
}

export function ComplexityChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Theoretical Operation Count</h3>
        <p className="text-sm text-slate-400 mt-1">
          Approximate arithmetic operations vs polynomial degree. Log scale on y-axis — notice how
          O(n²) diverges rapidly while both FFT variants stay near-flat.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={DATA} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="n"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            label={{ value: "n (polynomial degree)", position: "insideBottom", offset: -2, fill: "#64748b", fontSize: 11 }}
          />
          <YAxis
            scale="log"
            domain={["auto", "auto"]}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickFormatter={fmtOps}
            label={{ value: "Operations (log scale)", angle: -90, position: "insideLeft", offset: -4, fill: "#64748b", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }}
            labelStyle={{ color: "#e2e8f0", fontWeight: 600 }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => [value != null ? `${fmtOps(Number(value))} ops` : "—", name]}
          />
          <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 12 }} />
          <Line
            type="monotone"
            dataKey="Naive O(n²)"
            stroke="#7c3aed"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Recursive FFT"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Iterative FFT"
            stroke="#06b6d4"
            strokeWidth={2.5}
            strokeDasharray="6 3"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-slate-500">
        Recursive FFT ≈ 4·n·log₂n ops (complex butterfly). Iterative FFT ≈ 3·n·log₂n (same passes, no recursion overhead). Naive = n² multiply-accumulates.
      </p>
    </div>
  );
}
