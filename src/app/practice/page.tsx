import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlaceholderPanel } from "@/components/shared/PlaceholderPanel";
import { ProblemCard } from "@/components/practice/ProblemCard";
import { CodeIDE } from "@/components/practice/CodeIDE";
import { TestCaseSkeleton } from "@/components/practice/TestCaseSkeleton";
import { PROBLEM_CARDS } from "@/lib/placeholders";

export default function PracticePage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Practice"
        title="Problems & Editor"
        description="Problem cards, a built-in editor skeleton, and external practice links. Nothing executes yet."
      />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Problems
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_CARDS.map((p) => (
            <ProblemCard key={p.title} problem={p} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Built-in editor
        </h2>
        <CodeIDE />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Test cases
        </h2>
        <TestCaseSkeleton />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          External practice
        </h2>
        <PlaceholderPanel
          title="External Links"
          subtitle="Curated problem links to LeetCode, Codeforces, and AtCoder will live here."
          minHeight={140}
        />
      </section>
    </div>
  );
}
