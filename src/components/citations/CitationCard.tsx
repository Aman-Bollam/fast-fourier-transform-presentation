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

const CATEGORY_VARIANT: Record<CitationCategory, "blue" | "cyan" | "emerald"> = {
  textbook: "blue",
  online: "cyan",
  competitive: "emerald",
};

const CATEGORY_LABEL: Record<CitationCategory, string> = {
  textbook: "Textbook",
  online: "Online",
  competitive: "Competitive Programming",
};

export function CitationCard({ citation }: { citation: Citation }) {
  return (
    <article className="flex min-h-[310px] flex-col gap-4 rounded-xl border border-cyan-500/20 bg-slate-950/45 p-6 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-100">
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
        <p className="self-start rounded-md bg-slate-800/60 px-2 py-1 text-xs font-mono text-slate-400">
          {citation.section}
        </p>
      )}

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-slate-300">{citation.description}</p>

      {/* Footer row: year + link */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-800/70 pt-4">
        <span className="text-xs text-slate-500">{citation.year}</span>
        {citation.url && (
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Visit source →
          </a>
        )}
      </div>
    </article>
  );
}
