import { LOREM } from "@/lib/placeholders";

export function ArticleSkeleton() {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 sm:p-8">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300 mb-4">
        Written Article
      </h3>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
      </div>
    </article>
  );
}
