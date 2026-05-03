"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SIZES = [128, 256, 512, 1024, 2048, 4096, 8192] as const;
type DegreeSize = (typeof SIZES)[number];

interface BenchmarkResult {
  degree: DegreeSize;
  naiveMs: number;
  fftMs: number;
}

type BenchmarkState =
  | { status: "idle" }
  | { status: "running"; progress: number }
  | { status: "done"; results: BenchmarkResult[] };

function naiveMultiply(a: Float64Array, b: Float64Array): Float64Array {
  const result = new Float64Array(a.length + b.length - 1);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] += a[i] * b[j];
    }
  }
  return result;
}

function nextPow2(n: number): number {
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

function fftInPlace(re: Float64Array, im: Float64Array, inv: boolean): void {
  const n = re.length;
  // Bit-reversal permutation
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  // Butterfly passes
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (inv ? 1 : -1) * 2 * Math.PI / len;
    const wRe = Math.cos(ang), wIm = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let curRe = 1, curIm = 0;
      for (let j = 0; j < len / 2; j++) {
        const uRe = re[i + j], uIm = im[i + j];
        const vRe = curRe * re[i + j + len / 2] - curIm * im[i + j + len / 2];
        const vIm = curRe * im[i + j + len / 2] + curIm * re[i + j + len / 2];
        re[i + j] = uRe + vRe;
        im[i + j] = uIm + vIm;
        re[i + j + len / 2] = uRe - vRe;
        im[i + j + len / 2] = uIm - vIm;
        const newRe = curRe * wRe - curIm * wIm;
        curIm = curRe * wIm + curIm * wRe;
        curRe = newRe;
      }
    }
  }
  if (inv) {
    for (let i = 0; i < n; i++) {
      re[i] /= n;
      im[i] /= n;
    }
  }
}

function fftMultiply(a: Float64Array, b: Float64Array): Float64Array {
  const resultLen = a.length + b.length - 1;
  const n = nextPow2(resultLen);
  const aRe = new Float64Array(n), aIm = new Float64Array(n);
  const bRe = new Float64Array(n), bIm = new Float64Array(n);
  for (let i = 0; i < a.length; i++) aRe[i] = a[i];
  for (let i = 0; i < b.length; i++) bRe[i] = b[i];
  fftInPlace(aRe, aIm, false);
  fftInPlace(bRe, bIm, false);
  // Pointwise multiply
  const cRe = new Float64Array(n), cIm = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    cRe[i] = aRe[i] * bRe[i] - aIm[i] * bIm[i];
    cIm[i] = aRe[i] * bIm[i] + aIm[i] * bRe[i];
  }
  fftInPlace(cRe, cIm, true);
  return cRe.slice(0, resultLen);
}

async function runBenchmarks(
  onProgress: (p: number) => void,
  onDone: (results: BenchmarkResult[]) => void
): Promise<void> {
  const results: BenchmarkResult[] = [];
  for (let idx = 0; idx < SIZES.length; idx++) {
    await new Promise<void>((resolve) => setTimeout(resolve, 0)); // yield to UI
    const degree = SIZES[idx];
    const a = Float64Array.from({ length: degree }, () => Math.random());
    const b = Float64Array.from({ length: degree }, () => Math.random());

    const t0 = performance.now();
    naiveMultiply(a, b);
    const naiveMs = performance.now() - t0;

    const t1 = performance.now();
    fftMultiply(a, b);
    const fftMs = performance.now() - t1;

    results.push({ degree, naiveMs, fftMs });
    onProgress((idx + 1) / SIZES.length);
  }
  onDone(results);
}

export function BenchmarkPanel() {
  const [state, setState] = useState<BenchmarkState>({ status: "running", progress: 0 });

  async function handleRun() {
    setState({ status: "running", progress: 0 });
    await runBenchmarks(
      (p) => setState({ status: "running", progress: p }),
      (results) => setState({ status: "done", results })
    );
  }

  // Auto-run on mount
  useEffect(() => { handleRun(); }, []); // eslint-disable-line

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 space-y-5">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Live Performance Benchmark</h3>
        <p className="text-sm text-slate-400 mt-1">
          Naive O(n²) vs FFT O(n log n) polynomial multiplication, measured in your browser.
          Results may vary by device — larger degrees expose the gap most clearly.
        </p>
      </div>

      {state.status === "running" && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${Math.round(state.progress * 100)}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 shrink-0">
              {Math.round(state.progress * 100)}%
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Running benchmark… naive multiply may be slow for large n.
          </p>
        </div>
      )}

      {state.status === "done" && (
        <div className="space-y-4">
          {/* Results table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-2 pr-4 text-left text-xs font-medium text-slate-500">
                    Degree n
                  </th>
                  <th className="py-2 pr-4 text-right text-xs font-medium text-purple-400">
                    Naive (ms)
                  </th>
                  <th className="py-2 text-right text-xs font-medium text-blue-400">FFT (ms)</th>
                  <th className="py-2 pl-4 text-right text-xs font-medium text-slate-500">
                    Speedup
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.results.map((r) => (
                  <tr key={r.degree} className="border-b border-slate-800/50">
                    <td className="py-1.5 pr-4 font-mono text-xs text-slate-300">{r.degree}</td>
                    <td className="py-1.5 pr-4 text-right font-mono text-xs text-purple-300">
                      {r.naiveMs.toFixed(2)}
                    </td>
                    <td className="py-1.5 text-right font-mono text-xs text-blue-300">
                      {r.fftMs.toFixed(2)}
                    </td>
                    <td className="py-1.5 pl-4 text-right font-mono text-xs text-slate-400">
                      {r.naiveMs > 0 && r.fftMs > 0
                        ? `${(r.naiveMs / r.fftMs).toFixed(1)}×`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Bar chart */}
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={state.results.map((r) => ({
                name: `n=${r.degree}`,
                "Naive O(n²)": parseFloat(r.naiveMs.toFixed(2)),
                "FFT O(n log n)": parseFloat(r.fftMs.toFixed(2)),
              }))}
              margin={{ top: 8, right: 24, bottom: 8, left: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "#334155" }}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}s` : `${v}ms`
                }
                label={{
                  value: "Time (ms)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0", fontWeight: 600 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [value != null ? `${Number(value).toFixed(2)} ms` : "—", undefined]}
              />
              <Legend
                wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 8 }}
              />
              <Bar dataKey="Naive O(n²)" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="FFT O(n log n)" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <button
            onClick={handleRun}
            className="rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 px-4 py-1.5 text-xs text-slate-300 transition-colors"
          >
            Run again
          </button>
        </div>
      )}
    </div>
  );
}
