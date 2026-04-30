// Single entry point for running user code in any supported language.
// The IDE component dispatches through here so adding a third language
// (e.g. Java via a self-hosted runner, or wasm-clang) means changing one
// file, not the IDE.

import { runPython } from "./pyodideRunner";
import { runCpp } from "./cppWandboxRunner";
import type { Language, RunResult } from "./runnerTypes";

export function runCode(
  language: Language,
  code: string,
  stdin: string,
): Promise<RunResult> {
  return language === "python" ? runPython(code, stdin) : runCpp(code, stdin);
}
