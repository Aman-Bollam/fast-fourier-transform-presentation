// Shared types for every language runner (Pyodide, Wandbox, etc.).
// Keeping them language-neutral lets the IDE switch between runners
// without branching on shape.

export type Language = "python" | "cpp";

export type RunResult =
  | { success: true; output: string; language: Language }
  | { success: false; output: string; error: string; language: Language };
