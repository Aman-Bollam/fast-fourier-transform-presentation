// Experimental C++ runner backed by the public Wandbox API (https://wandbox.org).
//
// Wandbox is treated as an external dependency, not core infrastructure.
// If the public API is unreachable (CORS, rate limits, downtime), this
// returns a structured error message so the UI can show it instead of
// crashing. No backend, no fallback service.
//
// Future: replace with a self-hosted runner or an Emscripten-built clang
// running in a Web Worker. The `RunResult` shape is the swap-in contract.

import type { RunResult } from "./runnerTypes";

const WANDBOX_ENDPOINT = "https://wandbox.org/api/compile.json";

// `gcc-head` is Wandbox's rolling latest GCC build — durable name, always
// available, supports modern C++. If it ever disappears, swap to a pinned
// version like "gcc-13.2.0".
const DEFAULT_COMPILER = "gcc-head";
const DEFAULT_OPTIONS = "warning,gnu++17";

type WandboxResponse = {
  status?: string;
  signal?: string;
  compiler_output?: string;
  compiler_error?: string;
  compiler_message?: string;
  program_output?: string;
  program_error?: string;
  program_message?: string;
};

export async function runCpp(code: string): Promise<RunResult> {
  let response: Response;
  try {
    response = await fetch(WANDBOX_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        compiler: DEFAULT_COMPILER,
        options: DEFAULT_OPTIONS,
        stdin: "",
        save: false,
      }),
    });
  } catch (err) {
    return {
      success: false,
      output: "",
      error:
        "Could not reach Wandbox (wandbox.org). This is usually a CORS, " +
        "ad-blocker, or network issue — C++ here depends on Wandbox's " +
        "public API and there is no backend fallback.\n\n" +
        `Details: ${describe(err)}`,
    };
  }

  if (!response.ok) {
    return {
      success: false,
      output: "",
      error:
        `Wandbox responded with HTTP ${response.status}. ` +
        "The public API may be rate-limited or temporarily unavailable. " +
        "Try again in a moment.",
    };
  }

  let data: WandboxResponse;
  try {
    data = (await response.json()) as WandboxResponse;
  } catch (err) {
    return {
      success: false,
      output: "",
      error: `Wandbox returned an unparseable response: ${describe(err)}`,
    };
  }

  const programOutput = data.program_output ?? "";
  const programError = data.program_error ?? "";
  const compilerError = (data.compiler_error ?? "").trim();
  const status = data.status ?? "0";
  const exitCode = Number.parseInt(status, 10);

  // Compile failed: program never ran.
  if (compilerError && !data.program_output && !data.program_error) {
    return {
      success: false,
      output: "",
      error: `Compilation failed:\n${compilerError}`,
    };
  }

  if (data.signal) {
    return {
      success: false,
      output: programOutput,
      error: `Program terminated by signal: ${data.signal}\n${programError}`.trim(),
    };
  }

  if (Number.isFinite(exitCode) && exitCode !== 0) {
    return {
      success: false,
      output: programOutput,
      error: `Program exited with status ${status}.\n${programError}`.trim(),
    };
  }

  // Success path. Surface stderr and compiler warnings if any.
  const sections: string[] = [];
  if (programOutput.trim()) sections.push(programOutput.trimEnd());
  if (programError.trim()) sections.push(`--- stderr ---\n${programError.trim()}`);
  if (compilerError) sections.push(`--- compiler warnings ---\n${compilerError}`);

  return {
    success: true,
    output: sections.length > 0 ? sections.join("\n\n") + "\n" : "",
  };
}

function describe(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
