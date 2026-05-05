import type { ReactNode } from "react";

type Variant = "blue" | "cyan" | "emerald" | "slate";

const VARIANTS: Record<Variant, string> = {
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  slate: "bg-slate-500/10 text-slate-300 border-slate-500/30",
};

export function Badge({
  children,
  variant = "slate",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
