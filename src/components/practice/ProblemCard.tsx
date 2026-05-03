import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import type { Difficulty, ProblemCardData } from "@/lib/placeholders";

const DIFFICULTY_VARIANT: Record<Difficulty, "emerald" | "blue" | "purple"> = {
  Easy: "emerald",
  Medium: "blue",
  Hard: "purple",
};

export function ProblemCard({ problem }: { problem: ProblemCardData }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 transition-colors hover:border-slate-700">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-slate-100">
          {problem.title}
        </h3>
        <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]}>{problem.difficulty}</Badge>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {problem.tags.map((tag) => (
          <Badge key={tag} variant="slate">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-relaxed flex-1">{problem.blurb}</p>
      <Link
        href={problem.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-fit items-center text-sm font-medium text-blue-300 hover:text-blue-200"
      >
        View problem →
      </Link>
    </article>
  );
}
