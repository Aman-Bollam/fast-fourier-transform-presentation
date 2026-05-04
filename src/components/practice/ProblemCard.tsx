import { Badge } from "@/components/shared/Badge";
import type { Difficulty, FftProblem } from "@/lib/fftProblems";

const DIFFICULTY_VARIANT: Record<Difficulty, "emerald" | "blue" | "purple"> = {
  Easy: "emerald",
  Medium: "blue",
  Hard: "purple",
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
    "flex flex-col rounded-2xl border bg-slate-900/60 backdrop-blur p-6 transition-colors",
    selected
      ? "border-cyan-500/60 ring-1 ring-cyan-500/30 cursor-default"
      : "border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 cursor-pointer",
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
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-slate-100">
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

      <p className="mt-4 text-sm text-slate-400 leading-relaxed flex-1">
        {problem.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span
          className={
            selected
              ? "rounded-md border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200"
              : "rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300"
          }
        >
          {selected ? "Selected for practice" : "Click to select"}
        </span>
        <a
          href={problem.problemUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm font-medium text-blue-300 hover:text-blue-200"
        >
          Open problem →
        </a>
      </div>
    </article>
  );
}
