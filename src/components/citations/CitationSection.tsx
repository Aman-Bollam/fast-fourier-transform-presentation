import { CitationCard } from "./CitationCard";
import type { Citation, CitationCategory } from "./CitationCard";

const CATEGORY_TITLES: Record<CitationCategory, string> = {
  textbook: "Textbooks",
  online: "Online References",
  competitive: "Competitive Programming Resources",
};

const CATEGORY_DESCRIPTIONS: Record<CitationCategory, string> = {
  textbook: "Comprehensive treatments of algorithms, FFT, and polynomial methods.",
  online: "High-quality articles and documentation for deeper understanding.",
  competitive: "Problem sets, templates, and libraries to level up your FFT skills.",
};

interface CitationSectionProps {
  category: CitationCategory;
  citations: Citation[];
}

function SectionIcon({ category }: { category: CitationCategory }) {
  if (category === "textbook") {
    return (
      <svg viewBox="0 0 28 28" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 7.5c0-1 .8-1.8 1.8-1.8h5c1.1 0 2.1.4 2.8 1.1.7-.7 1.7-1.1 2.8-1.1h5c1 0 1.8.8 1.8 1.8V21c0 .6-.5 1.1-1.1 1.1H17c-1.1 0-2.1.4-2.8 1.1-.7-.7-1.7-1.1-2.8-1.1H5.6c-.6 0-1.1-.5-1.1-1.1Z" />
        <path d="M14 6.8v15" />
      </svg>
    );
  }
  if (category === "online") {
    return (
      <svg viewBox="0 0 28 28" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <path d="M4 14h20" />
        <path d="M14 4c3 3 4.2 6.2 4.2 10S17 21 14 24c-3-3-4.2-6.2-4.2-10S11 7 14 4Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10 9-5 5 5 5" />
      <path d="m18 9 5 5-5 5" />
      <path d="m16 6-4 16" />
    </svg>
  );
}

export function CitationSection({ category, citations }: CitationSectionProps) {
  const gridClass =
    category === "textbook"
      ? "grid gap-5 md:grid-cols-2"
      : "grid gap-5 md:grid-cols-2 xl:grid-cols-3";

  return (
    <section className="space-y-5">
      <div className="flex items-start gap-4">
        <span className="mt-1 text-cyan-300">
          <SectionIcon category={category} />
        </span>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-100">
            {CATEGORY_TITLES[category]}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{CATEGORY_DESCRIPTIONS[category]}</p>
        </div>
      </div>
      <div className={gridClass}>
        {citations.map(c => (
          <CitationCard key={c.id} citation={c} />
        ))}
      </div>
    </section>
  );
}
