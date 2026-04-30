// Frontend-only Python execution via Pyodide (WebAssembly).
//
// Loads Pyodide from the official jsDelivr CDN on demand, redirects stdout/stderr,
// and runs Python code in the main thread. All execution stays in the browser —
// no backend.
//
// Future: to move execution off the main thread, replace `runPython` internals
// with a Web Worker that imports Pyodide via `importScripts(PYODIDE_INDEX_URL +
// "pyodide.js")` and exchanges code/results through `postMessage`. The
// `RunResult` shape below is already the message contract.

import type { RunResult } from "./runnerTypes";
export type { RunResult };

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type StdStream = { batched: (s: string) => void };

interface PyodideAPI {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (stream: StdStream) => void;
  setStderr: (stream: StdStream) => void;
}

interface LoadPyodideOptions {
  indexURL: string;
}

declare global {
  interface Window {
    loadPyodide?: (options: LoadPyodideOptions) => Promise<PyodideAPI>;
  }
}

let pyodidePromise: Promise<PyodideAPI> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-pyodide-loader="true"]`
    );
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.pyodideLoader = "true";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export function getPyodide(): Promise<PyodideAPI> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Pyodide can only run in the browser"));
  }
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${PYODIDE_INDEX_URL}pyodide.js`);
      if (!window.loadPyodide) {
        throw new Error("Pyodide global not available after script load");
      }
      return window.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
    })();
  }
  return pyodidePromise;
}

export async function runPython(code: string): Promise<RunResult> {
  let pyodide: PyodideAPI;
  try {
    pyodide = await getPyodide();
  } catch (err) {
    return {
      success: false,
      output: "",
      error: `Failed to initialize Pyodide: ${errorMessage(err)}`,
    };
  }

  let buffer = "";
  const append = (s: string) => {
    buffer += s.endsWith("\n") ? s : s + "\n";
  };
  pyodide.setStdout({ batched: append });
  pyodide.setStderr({ batched: append });

  try {
    await pyodide.runPythonAsync(code);
    return { success: true, output: buffer };
  } catch (err) {
    return {
      success: false,
      output: buffer,
      error: errorMessage(err),
    };
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
