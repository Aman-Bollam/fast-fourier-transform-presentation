// Runs a sequence of sample tests against user code by reusing the existing
// language dispatcher (`runCode`) and comparing stdout to expected output
// the way most online judges effectively do: tokenize on whitespace, compare
// element-by-element.

import { runCode } from "./codeRunner";
import type { Language } from "./runnerTypes";
import type { SampleTest } from "./fftProblems";

export type SampleResult = {
  name: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  errorMessage?: string;
};

export type RunSamplesProgress = (current: number, total: number) => void;

function tokenize(s: string): string[] {
  return s
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function compareOutputs(actual: string, expected: string): boolean {
  const a = tokenize(actual);
  const e = tokenize(expected);
  if (a.length !== e.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== e[i]) return false;
  }
  return true;
}

export async function runSamples(
  language: Language,
  code: string,
  samples: SampleTest[],
  onProgress?: RunSamplesProgress,
): Promise<SampleResult[]> {
  const results: SampleResult[] = [];
  for (let i = 0; i < samples.length; i++) {
    onProgress?.(i + 1, samples.length);
    const sample = samples[i];
    const result = await runCode(language, code, sample.input);
    if (result.success) {
      results.push({
        name: sample.name,
        input: sample.input,
        expected: sample.expectedOutput,
        actual: result.output,
        passed: compareOutputs(result.output, sample.expectedOutput),
      });
    } else {
      results.push({
        name: sample.name,
        input: sample.input,
        expected: sample.expectedOutput,
        actual: result.output,
        passed: false,
        errorMessage: result.error,
      });
    }
  }
  return results;
}
