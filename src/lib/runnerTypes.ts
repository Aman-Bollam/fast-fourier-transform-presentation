// Shared result type returned by every language runner (Pyodide, Wandbox, etc.).
// Keeping it language-neutral lets the IDE switch between runners without
// branching on shape.

export type RunResult =
  | { success: true; output: string }
  | { success: false; output: string; error: string };
