import { CitationCard } from "./CitationCard";
import type { Citation, CitationCategory } from "./CitationCard";

const CATEGORY_TITLES: Record<CitationCategory, string> = {
  textbook: "Textbooks",
  online: "Online References",
  competitive: "Competitive Programming Resources",
};

interface CitationSectionProps {
  category: CitationCategory;
  citations: Citation[];
}

export function CitationSection({ category, citations }: CitationSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        {CATEGORY_TITLES[category]}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {citations.map(c => (
          <CitationCard key={c.id} citation={c} />
        ))}
      </div>
    </section>
  );
}
