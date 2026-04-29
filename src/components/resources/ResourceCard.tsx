import type { ResourceSection } from "@/lib/placeholders";

const ACCENT: Record<ResourceSection["accent"], string> = {
  blue: "text-blue-300",
  purple: "text-purple-300",
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
};

export function ResourceCard({ section }: { section: ResourceSection }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6">
      <h3 className={`text-base font-semibold tracking-tight ${ACCENT[section.accent]}`}>
        {section.title}
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{section.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {section.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1.5 inline-block size-1.5 rounded-full bg-slate-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
