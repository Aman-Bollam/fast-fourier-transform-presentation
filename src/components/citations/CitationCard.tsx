import { Badge } from "@/components/shared/Badge";

export type CitationCategory = "textbook" | "online" | "competitive";

export interface Citation {
  id: string;
  title: string;
  authors: string;
  year: number | string;
  url?: string;
  description: string;
  category: CitationCategory;
  section?: string;
}

const CATEGORY_VARIANT: Record<CitationCategory, "blue" | "purple" | "cyan" | "emerald"> = {
  textbook: "blue",
  online: "cyan",
  competitive: "purple",
};

const CATEGORY_LABEL: Record<CitationCategory, string> = {
  textbook: "Textbook",
  online: "Online",
  competitive: "Competitive Programming",
};

export function CitationCard({ citation }: { citation: Citation }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-slate-100 leading-snug">
            {citation.title}
          </h3>
          <p className="mt-0.5 text-sm text-slate-400">{citation.authors}</p>
        </div>
        <Badge variant={CATEGORY_VARIANT[citation.category]}>
          {CATEGORY_LABEL[citation.category]}
        </Badge>
      </div>

      {/* Optional section reference */}
      {citation.section && (
        <p className="text-xs font-mono text-slate-500 bg-slate-800/60 rounded px-2 py-1 self-start">
          {citation.section}
        </p>
      )}

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed flex-1">{citation.description}</p>

      {/* Footer row: year + link */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/60">
        <span className="text-xs text-slate-500">{citation.year}</span>
        {citation.url && (
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Visit source →
          </a>
        )}
      </div>
    </article>
  );
}
