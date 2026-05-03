"use client";

import katex from "katex";

interface KaTeXProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeX({ math, displayMode = false, className }: KaTeXProps) {
  const html = katex.renderToString(math, {
    displayMode,
    throwOnError: false,
    errorColor: "#f87171",
  });
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
