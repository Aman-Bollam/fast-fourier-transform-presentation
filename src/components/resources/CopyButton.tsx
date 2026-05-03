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
      className="rounded-md border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
