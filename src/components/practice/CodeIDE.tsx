"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPyodide } from "@/lib/pyodideRunner";
import { runCode } from "@/lib/codeRunner";
import { runSamples, type SampleResult } from "@/lib/sampleRunner";
import type { Language, RunResult } from "@/lib/runnerTypes";
import type { Difficulty, FftProblem, SampleTest } from "@/lib/fftProblems";
import { Badge } from "@/components/shared/Badge";

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

const DIFFICULTY_VARIANT: Record<Difficulty, "emerald" | "blue" | "purple"> = {
  Easy: "emerald",
  Medium: "blue",
  Hard: "purple",
};

type PyodideState = "loading" | "ready" | "error";
type RunPhase = "idle" | "custom" | "samples";

export function CodeIDE({ problem }: { problem?: FftProblem }) {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState<Record<Language, string>>(STARTERS);
  const [stdin, setStdin] = useState<string>(DEFAULT_STDIN);
  const [output, setOutput] = useState("");
  const [runPhase, setRunPhase] = useState<RunPhase>("idle");
  const [sampleProgress, setSampleProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [sampleResults, setSampleResults] = useState<SampleResult[] | null>(null);
  const [pyodideState, setPyodideState] = useState<PyodideState>("loading");
  const [pyodideError, setPyodideError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  // Track the last problem we saw so we only auto-overwrite stdin when it
  // actually changes — the initial mount must NOT clobber localStorage.
  const lastProblemId = useRef<string | undefined>(problem?.id);

  const running = runPhase !== "idle";

  // Restore saved code per language + saved stdin on mount. If no stdin is
  // saved yet, fall back to the selected problem's first sample so a fresh
  // visit lands with a runnable input pre-filled.
  useEffect(() => {
    const nextCode: Record<Language, string> = { ...STARTERS };
    let nextStdin = problem?.sampleTests[0]?.input ?? DEFAULT_STDIN;
    try {
      (Object.keys(STORAGE_KEYS) as Language[]).forEach((lang) => {
        const saved = localStorage.getItem(STORAGE_KEYS[lang]);
        if (saved !== null) nextCode[lang] = saved;
      });
      const savedStdin = localStorage.getItem(STDIN_STORAGE_KEY);
      if (savedStdin !== null) nextStdin = savedStdin;
    } catch {
      // localStorage may be unavailable; fall back to defaults.
    }
    setCode(nextCode);
    setStdin(nextStdin);
    setHydrated(true);
    // The mount run already initialised lastProblemId from props so the
    // problem-change effect won't fire on first paint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the user *switches* to a different problem (post-mount), clear stale
  // sample results and overwrite the stdin buffer with the new problem's
  // first sample input so the editor is immediately ready to run.
  useEffect(() => {
    if (!hydrated) return;
    if (problem?.id === lastProblemId.current) return;
    lastProblemId.current = problem?.id;
    setSampleResults(null);
    if (problem) setStdin(problem.sampleTests[0].input);
  }, [problem, hydrated]);

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

  // Warm up Pyodide in the background regardless of starting language.
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

  const handleRunCustom = useCallback(async () => {
    if (running) return;
    if (language === "python" && pyodideState !== "ready") return;
    setRunPhase("custom");
    const result: RunResult = await runCode(language, code[language], stdin);
    if (result.success) {
      setOutput(result.output.length > 0 ? result.output : "(no output)");
    } else {
      const combined = [result.output, result.error].filter(Boolean).join("\n");
      setOutput(combined || "Unknown error");
    }
    setRunPhase("idle");
  }, [code, language, stdin, running, pyodideState]);

  const handleRunSamples = useCallback(async () => {
    if (running || !problem) return;
    if (language === "python" && pyodideState !== "ready") return;
    setRunPhase("samples");
    setSampleResults(null);
    setSampleProgress({ current: 0, total: problem.sampleTests.length });
    const results = await runSamples(
      language,
      code[language],
      problem.sampleTests,
      (current, total) => setSampleProgress({ current, total }),
    );
    setSampleResults(results);
    setSampleProgress(null);
    setRunPhase("idle");
  }, [problem, language, code, running, pyodideState]);

  const handleClearOutput = useCallback(() => setOutput(""), []);

  const handleResetCode = useCallback(() => {
    if (typeof window !== "undefined") {
      const ok = window.confirm(
        `Reset ${language === "python" ? "Python" : "C++"} code to the generic FFT starter? Current changes will be lost.`,
      );
      if (!ok) return;
    }
    setCode((prev) => ({ ...prev, [language]: STARTERS[language] }));
  }, [language]);

  const handleLoadStarter = useCallback(() => {
    if (!problem) return;
    if (typeof window !== "undefined") {
      const ok = window.confirm(
        `Replace your current ${language === "python" ? "Python" : "C++"} code with the starter scaffold for "${problem.title}"?`,
      );
      if (!ok) return;
    }
    setCode((prev) => ({ ...prev, [language]: problem.starterCode[language] }));
  }, [problem, language]);

  const handleResetInput = useCallback(() => {
    setStdin(problem?.sampleTests[0]?.input ?? DEFAULT_STDIN);
  }, [problem]);

  const handleUseSampleInput = useCallback((input: string) => {
    setStdin(input);
  }, []);

  const handleCodeChange = useCallback(
    (v: string | undefined) => {
      setCode((prev) => ({ ...prev, [language]: v ?? "" }));
    },
    [language],
  );

  const pyodideBlocked = language === "python" && pyodideState !== "ready";
  const customRunDisabled = running || pyodideBlocked;
  const sampleRunDisabled = running || pyodideBlocked || !problem;

  const customRunLabel = (() => {
    if (runPhase === "custom") return language === "cpp" ? "Compiling…" : "Running…";
    if (pyodideBlocked && pyodideState === "loading") return "Loading Python…";
    return "Run custom input";
  })();

  const sampleRunLabel = (() => {
    if (runPhase === "samples" && sampleProgress) {
      return `Running sample ${sampleProgress.current}/${sampleProgress.total}…`;
    }
    return "Run sample tests";
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

      {problem && <ProblemHeader problem={problem} />}

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

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRunCustom}
              disabled={customRunDisabled}
              className="rounded-lg bg-blue-500/90 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {customRunLabel}
            </button>
            <button
              type="button"
              onClick={handleRunSamples}
              disabled={sampleRunDisabled}
              title={
                !problem
                  ? "Pick a problem above to enable sample tests"
                  : undefined
              }
              className="rounded-lg bg-emerald-500/90 hover:bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sampleRunLabel}
            </button>
            {problem && (
              <button
                type="button"
                onClick={handleLoadStarter}
                className="rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition-colors"
              >
                Load starter code
              </button>
            )}
            <button
              type="button"
              onClick={handleResetCode}
              className="rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition-colors"
            >
              Reset code
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
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
                . C++ samples run sequentially — about 3 s per sample.
              </>
            )}
          </p>
        </div>

        {/* Right column — input, custom output, sample results */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <InputPanel value={stdin} onChange={setStdin} onReset={handleResetInput} />
          <OutputPanel output={output} onClear={handleClearOutput} />
          {sampleResults && (
            <SampleResultsPanel
              results={sampleResults}
              problemUrl={problem?.problemUrl}
              onClear={() => setSampleResults(null)}
            />
          )}
        </div>
      </div>

      {problem && (
        <SampleTestsReference
          samples={problem.sampleTests}
          onUseInput={handleUseSampleInput}
        />
      )}
    </section>
  );
}

function ProblemHeader({ problem }: { problem: FftProblem }) {
  return (
    <div className="mb-4 rounded-xl border border-cyan-500/30 bg-cyan-500/4 px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
        Selected
      </span>
      <span className="text-sm font-medium text-slate-100">{problem.title}</span>
      <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]}>
        {problem.difficulty}
      </Badge>
      <div className="flex flex-wrap gap-1">
        {problem.tags.map((tag) => (
          <Badge key={tag} variant="slate">
            {tag}
          </Badge>
        ))}
      </div>
      <span className="text-xs text-slate-400">
        {problem.sampleTests.length} sample test
        {problem.sampleTests.length === 1 ? "" : "s"}
      </span>
      <a
        href={problem.problemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto text-xs font-medium text-blue-300 hover:text-blue-200"
      >
        Open on Codeforces ↗
      </a>
    </div>
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
          Custom output
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
            Output of &ldquo;Run custom input&rdquo; will appear here.
          </span>
        )}
      </pre>
    </div>
  );
}

function SampleResultsPanel({
  results,
  problemUrl,
  onClear,
}: {
  results: SampleResult[];
  problemUrl?: string;
  onClear: () => void;
}) {
  const passed = results.filter((r) => r.passed).length;
  const total = results.length;
  const allPassed = passed === total;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2 gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Sample tests
        </h4>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          Clear results
        </button>
      </div>

      <div
        className={[
          "rounded-xl border p-4 space-y-3",
          allPassed
            ? "border-emerald-500/40 bg-emerald-500/4"
            : "border-slate-800 bg-slate-950/80",
        ].join(" ")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p
            className={`text-sm font-semibold ${
              allPassed ? "text-emerald-300" : "text-slate-200"
            }`}
          >
            {passed} / {total} sample test{total === 1 ? "" : "s"} passed
          </p>
        </div>

        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={i}>
              <details
                open={!r.passed}
                className="rounded-lg border border-slate-800 bg-slate-950/60"
              >
                <summary className="cursor-pointer list-none px-3 py-2 flex items-center gap-2 text-sm">
                  <span
                    aria-hidden
                    className={`inline-block size-1.5 rounded-full ${
                      r.passed ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  />
                  <span className="font-medium text-slate-200">{r.name}</span>
                  <span
                    className={`ml-auto text-xs ${
                      r.passed ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    {r.passed ? "Passed" : "Failed"}
                  </span>
                </summary>
                <div className="px-3 pb-3 space-y-2 text-xs">
                  <DiffField label="Input" value={r.input} />
                  <DiffField label="Expected" value={r.expected} />
                  {r.errorMessage ? (
                    <DiffField label="Error" value={r.errorMessage} />
                  ) : (
                    <DiffField label="Actual" value={r.actual} />
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <p className="text-xs text-slate-500 leading-relaxed">
          Passing samples does not guarantee acceptance. Submit on the original
          judge for full validation.
          {problemUrl && (
            <>
              {" "}
              <a
                href={problemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
              >
                Open problem on Codeforces ↗
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function SampleTestsReference({
  samples,
  onUseInput,
}: {
  samples: SampleTest[];
  onUseInput: (input: string) => void;
}) {
  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Sample tests for this problem
        </h4>
        <span className="text-xs text-slate-500">
          {samples.length} sample{samples.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {samples.map((s, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-800 bg-slate-950/60 p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-200">{s.name}</p>
              <button
                type="button"
                onClick={() => onUseInput(s.input)}
                className="text-xs font-medium text-blue-300 hover:text-blue-200"
              >
                Use as input
              </button>
            </div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">
              Input
            </p>
            <pre className="mb-2 max-h-28 overflow-auto rounded border border-slate-800 bg-slate-950/80 p-2 text-xs font-mono text-slate-300 whitespace-pre-wrap">
              {s.input || <span className="text-slate-600">(empty)</span>}
            </pre>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">
              Expected output
            </p>
            <pre className="max-h-28 overflow-auto rounded border border-slate-800 bg-slate-950/80 p-2 text-xs font-mono text-slate-300 whitespace-pre-wrap">
              {s.expectedOutput || (
                <span className="text-slate-600">(empty)</span>
              )}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiffField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <pre className="max-h-40 overflow-auto rounded border border-slate-800 bg-slate-950/80 p-2 font-mono text-slate-300 whitespace-pre-wrap">
        {value.length > 0 ? value : <span className="text-slate-600">(empty)</span>}
      </pre>
    </div>
  );
}
