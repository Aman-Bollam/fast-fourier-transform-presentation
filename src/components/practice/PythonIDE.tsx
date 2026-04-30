"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPyodide, runPython, type RunResult } from "@/lib/pyodideRunner";

// Monaco loads browser-only chunks; defer SSR.
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const STORAGE_KEY = "fft-lab.python-ide.code.v1";

const STARTER_CODE = `# FFT practice starter
# For now, use this editor to test Python code while learning the FFT idea.

def polynomial_multiply(a, b):
    result = [0] * (len(a) + len(b) - 1)

    for i in range(len(a)):
        for j in range(len(b)):
            result[i + j] += a[i] * b[j]

    return result

print(polynomial_multiply([1, 2, 3], [4, 5]))
`;

type PyodideState = "loading" | "ready" | "error";

export function PythonIDE() {
  const [code, setCode] = useState<string>(STARTER_CODE);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [pyodideState, setPyodideState] = useState<PyodideState>("loading");
  const [pyodideError, setPyodideError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore saved code on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setCode(saved);
    } catch {
      // localStorage may be unavailable (private mode, etc.) — silently keep starter.
    }
    setHydrated(true);
  }, []);

  // Debounced persist on every change.
  useEffect(() => {
    if (!hydrated) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        // ignore quota/privacy errors
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code, hydrated]);

  // Warm up Pyodide in the background.
  useEffect(() => {
    let mounted = true;
    getPyodide()
      .then(() => {
        if (mounted) setPyodideState("ready");
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setPyodideState("error");
        setPyodideError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleRun = useCallback(async () => {
    if (running || pyodideState !== "ready") return;
    setRunning(true);
    const result: RunResult = await runPython(code);
    if (result.success) {
      setOutput(result.output.length > 0 ? result.output : "(no output)");
    } else {
      const combined = [result.output, result.error].filter(Boolean).join("\n");
      setOutput(combined || "Unknown error");
    }
    setRunning(false);
  }, [code, running, pyodideState]);

  const handleClear = useCallback(() => setOutput(""), []);
  const handleReset = useCallback(() => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Reset to starter code? Your current changes will be lost.");
      if (!ok) return;
    }
    setCode(STARTER_CODE);
  }, []);

  const runDisabled = running || pyodideState !== "ready";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Editor
          </h3>
          <PyodideStatus state={pyodideState} error={pyodideError} />
        </div>
        <select
          // Language switcher placeholder — Python only for now. C++ can plug in here later
          // by routing to a different runner (e.g. an Emscripten-compiled clang bundle).
          disabled
          value="python"
          className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1 text-xs text-slate-400"
        >
          <option value="python">Python 3 (Pyodide)</option>
        </select>
      </header>

      <div
        className="rounded-xl border border-slate-800 overflow-hidden bg-[#1e1e1e]"
        style={{ height: 360 }}
      >
        <MonacoEditor
          height="100%"
          width="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          loading={
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Loading editor…
            </div>
          }
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "on",
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleRun}
          disabled={runDisabled}
          className="rounded-lg bg-blue-500/90 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {running ? "Running…" : pyodideState === "ready" ? "Run" : "Loading Python…"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition-colors"
        >
          Reset code
        </button>
        <span className="text-xs text-slate-500">
          Runs entirely in your browser via Pyodide (WebAssembly).
        </span>
      </div>

      <OutputPanel output={output} onClear={handleClear} />
    </section>
  );
}

function PyodideStatus({
  state,
  error,
}: {
  state: PyodideState;
  error: string | null;
}) {
  if (state === "ready") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        Python ready
      </span>
    );
  }
  if (state === "error") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs text-red-300"
        title={error ?? undefined}
      >
        <span className="size-1.5 rounded-full bg-red-400" />
        Python failed to load
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-amber-300">
      <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
      Loading Python…
    </span>
  );
}

function OutputPanel({
  output,
  onClear,
}: {
  output: string;
  onClear: () => void;
}) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Output
        </h4>
        <button
          type="button"
          onClick={onClear}
          disabled={output.length === 0}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Clear output
        </button>
      </div>
      <pre className="min-h-24 max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm font-mono text-slate-300 whitespace-pre-wrap">
        {output.length > 0 ? output : (
          <span className="text-slate-600">Output will appear here after you click Run.</span>
        )}
      </pre>
    </div>
  );
}
