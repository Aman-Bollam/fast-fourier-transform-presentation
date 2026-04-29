import Link from "next/link";
import type { Accent } from "@/lib/placeholders";

const ACCENT_RING: Record<Accent, string> = {
  blue: "hover:border-blue-500/40 hover:shadow-blue-500/10",
  purple: "hover:border-purple-500/40 hover:shadow-purple-500/10",
  cyan: "hover:border-cyan-500/40 hover:shadow-cyan-500/10",
  emerald: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
};

const ACCENT_BAR: Record<Accent, string> = {
  blue: "from-blue-500/60",
  purple: "from-purple-500/60",
  cyan: "from-cyan-500/60",
  emerald: "from-emerald-500/60",
};

const ACCENT_TITLE: Record<Accent, string> = {
  blue: "text-blue-300",
  purple: "text-purple-300",
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
};

export function FeatureCard({
  title,
  description,
  href,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  accent: Accent;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg ${ACCENT_RING[accent]}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${ACCENT_BAR[accent]} via-transparent to-transparent`}
      />
      <h3 className={`text-lg font-semibold tracking-tight ${ACCENT_TITLE[accent]}`}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
      <p className="mt-4 text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
        Open →
      </p>
    </Link>
  );
}
