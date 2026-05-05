import { Badge } from "@/components/shared/Badge";
import type { Difficulty, FftProblem } from "@/lib/fftProblems";

const DIFFICULTY_VARIANT: Record<Difficulty, "emerald" | "blue" | "cyan"> = {
  Easy: "emerald",
  Medium: "blue",
  Hard: "cyan",
};

export function ProblemCard({
  problem,
  selected,
  onSelect,
}: {
  problem: FftProblem;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const handleSelect = () => {
    if (!selected) onSelect(problem.id);
  };

  const containerClasses = [
    "relative flex min-h-[260px] flex-col rounded-xl border bg-slate-950/45 p-6 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur transition-colors",
    selected
      ? "border-cyan-500/80 ring-1 ring-cyan-500/35 cursor-default"
      : "border-slate-700/80 hover:border-cyan-500/35 hover:bg-slate-900/55 cursor-pointer",
  ].join(" ");

  return (
    <article
      className={containerClasses}
      role="button"
      tabIndex={selected ? -1 : 0}
      aria-pressed={selected}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      }}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 10 3 3 7-7" />
          </svg>
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="pr-6 text-base font-semibold tracking-tight text-slate-100">
          {problem.title}
        </h3>
        <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]}>
          {problem.difficulty}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {problem.tags.map((tag) => (
          <Badge key={tag} variant="slate">
            {tag}
          </Badge>
        ))}
        {selected && <Badge variant="cyan">Selected</Badge>}
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-400">
        {problem.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {selected && (
          <span className="rounded-md border border-cyan-500/50 bg-cyan-500/12 px-3 py-1.5 text-xs font-medium text-cyan-200">
            Selected
          </span>
        )}
        <a
          href={problem.problemUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="ml-auto text-sm font-medium text-blue-300 hover:text-blue-200"
        >
          Open problem →
        </a>
      </div>
    </article>
  );
}
