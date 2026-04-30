"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { getPyodide } from "@/lib/pyodideRunner";
import { runCode } from "@/lib/codeRunner";
import type { Language, RunResult } from "@/lib/runnerTypes";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const STORAGE_KEYS: Record<Language, string> = {
  python: "fft-ide-python-code",
  cpp: "fft-ide-cpp-code",
};

const STDIN_STORAGE_KEY = "fft-ide-stdin";

const PYTHON_STARTER = `# FFT practice starter — reads from stdin
# Try the default input on the right: 3 2 / 1 2 3 / 4 5

def polynomial_multiply(a, b):
    result = [0] * (len(a) + len(b) - 1)

    for i in range(len(a)):
        for j in range(len(b)):
            result[i + j] += a[i] * b[j]

    return result

n, m = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(*polynomial_multiply(a, b))
`;

const CPP_STARTER = `#include <bits/stdc++.h>
using namespace std;

vector<int> polynomial_multiply(vector<int>& a, vector<int>& b) {
    vector<int> result(a.size() + b.size() - 1, 0);

    for (int i = 0; i < (int)a.size(); i++) {
        for (int j = 0; j < (int)b.size(); j++) {
            result[i + j] += a[i] * b[j];
        }
    }

    return result;
}

int main() {
    int n, m;
    cin >> n >> m;

    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];

    vector<int> ans = polynomial_multiply(a, b);

    for (int x : ans) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
`;

const DEFAULT_STDIN = `3 2
1 2 3
4 5
`;

const STARTERS: Record<Language, string> = {
  python: PYTHON_STARTER,
  cpp: CPP_STARTER,
};

const MONACO_LANG: Record<Language, string> = {
  python: "python",
  cpp: "cpp",
};

type PyodideState = "loading" | "ready" | "error";

export function CodeIDE() {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState<Record<Language, string>>(STARTERS);
  const [stdin, setStdin] = useState<string>(DEFAULT_STDIN);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [pyodideState, setPyodideState] = useState<PyodideState>("loading");
  const [pyodideError, setPyodideError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore saved code per language + saved stdin on mount.
  useEffect(() => {
    const nextCode: Record<Language, string> = { ...STARTERS };
    let nextStdin = DEFAULT_STDIN;
    try {
      (Object.keys(STORAGE_KEYS) as Language[]).forEach((lang) => {
        const saved = localStorage.getItem(STORAGE_KEYS[lang]);
        if (saved !== null) nextCode[lang] = saved;
      });
      const savedStdin = localStorage.getItem(STDIN_STORAGE_KEY);
      if (savedStdin !== null) nextStdin = savedStdin;
    } catch {
      // localStorage may be unavailable (private mode); fall back to defaults.
    }
    setCode(nextCode);
    setStdin(nextStdin);
    setHydrated(true);
  }, []);

  // Debounced persist of the active language's code.
  useEffect(() => {
    if (!hydrated) return;
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS[language], code[language]);
      } catch {
        /* ignore */
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [code, language, hydrated]);

  // Debounced persist of stdin (shared across languages).
  useEffect(() => {
    if (!hydrated) return;
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(STDIN_STORAGE_KEY, stdin);
      } catch {
        /* ignore */
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [stdin, hydrated]);

  // Warm up Pyodide in the background, regardless of starting language.
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
    if (running) return;
    if (language === "python" && pyodideState !== "ready") return;
    setRunning(true);
    const result: RunResult = await runCode(language, code[language], stdin);
    if (result.success) {
      setOutput(result.output.length > 0 ? result.output : "(no output)");
    } else {
      const combined = [result.output, result.error].filter(Boolean).join("\n");
      setOutput(combined || "Unknown error");
    }
    setRunning(false);
  }, [code, language, stdin, running, pyodideState]);

  const handleClearOutput = useCallback(() => setOutput(""), []);

  const handleResetCode = useCallback(() => {
    if (typeof window !== "undefined") {
      const ok = window.confirm(
        `Reset ${language === "python" ? "Python" : "C++"} code to starter? Current changes will be lost.`,
      );
      if (!ok) return;
    }
    setCode((prev) => ({ ...prev, [language]: STARTERS[language] }));
  }, [language]);

  const handleResetInput = useCallback(() => {
    setStdin(DEFAULT_STDIN);
  }, []);

  const handleCodeChange = useCallback(
    (v: string | undefined) => {
      setCode((prev) => ({ ...prev, [language]: v ?? "" }));
    },
    [language],
  );

  const runDisabled = running || (language === "python" && pyodideState !== "ready");
  const runLabel = (() => {
    if (running) return language === "cpp" ? "Compiling…" : "Running…";
    if (language === "python" && pyodideState === "loading") return "Loading Python…";
    return "Run";
  })();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Editor
          </h3>
          <StatusPill
            language={language}
            pyodideState={pyodideState}
            pyodideError={pyodideError}
          />
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1 text-xs text-slate-200 hover:border-slate-700 transition-colors"
        >
          <option value="python">Python 3 (Pyodide)</option>
          <option value="cpp">C++ (Wandbox)</option>
        </select>
      </header>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Left column — editor + run controls */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div
            className="rounded-xl border border-slate-800 overflow-hidden bg-[#1e1e1e]"
            style={{ height: 440 }}
          >
            <MonacoEditor
              height="100%"
              width="100%"
              language={MONACO_LANG[language]}
              theme="vs-dark"
              value={code[language]}
              onChange={handleCodeChange}
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
                tabSize: language === "python" ? 4 : 2,
                wordWrap: "on",
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRun}
              disabled={runDisabled}
              className="rounded-lg bg-blue-500/90 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {runLabel}
            </button>
            <button
              type="button"
              onClick={handleResetCode}
              className="rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition-colors"
            >
              Reset code
            </button>
            <span className="text-xs text-slate-500">
              {language === "python" ? (
                "Runs in your browser via Pyodide (WebAssembly)."
              ) : (
                <>
                  Compiled remotely via wandbox.org. Avoid rapid repeated runs:
                  the public API rate-limits aggressive clients and can
                  temporarily block your IP. See the{" "}
                  <a
                    href="https://github.com/melpon/wandbox/blob/master/kennel/API.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
                  >
                    Wandbox API docs
                  </a>
                  .
                </>
              )}
            </span>
          </div>
        </div>

        {/* Right column — input + output */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <InputPanel
            value={stdin}
            onChange={setStdin}
            onReset={handleResetInput}
          />
          <OutputPanel output={output} onClear={handleClearOutput} />
        </div>
      </div>
    </section>
  );
}

function InputPanel({
  value,
  onChange,
  onReset,
}: {
  value: string;
  onChange: (v: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Input
        </h4>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          Reset input
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder="stdin — what input() and cin will read"
        className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
        rows={6}
      />
    </div>
  );
}

function StatusPill({
  language,
  pyodideState,
  pyodideError,
}: {
  language: Language;
  pyodideState: PyodideState;
  pyodideError: string | null;
}) {
  if (language === "cpp") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-cyan-300">
        <span className="size-1.5 rounded-full bg-cyan-400" />
        C++ via Wandbox
      </span>
    );
  }
  if (pyodideState === "ready") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        Python ready
      </span>
    );
  }
  if (pyodideState === "error") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs text-red-300"
        title={pyodideError ?? undefined}
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

function OutputPanel({ output, onClear }: { output: string; onClear: () => void }) {
  return (
    <div className="flex flex-col">
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
      <pre className="min-h-32 max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm font-mono text-slate-300 whitespace-pre-wrap">
        {output.length > 0 ? (
          output
        ) : (
          <span className="text-slate-600">
            Output will appear here after you click Run.
          </span>
        )}
      </pre>
    </div>
  );
}
