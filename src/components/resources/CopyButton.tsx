"use client";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-400 transition-colors hover:border-cyan-500/40 hover:bg-slate-900 hover:text-slate-200"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
