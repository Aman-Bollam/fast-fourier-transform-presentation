import { SectionHeader } from "@/components/shared/SectionHeader";
import { VisualTutorialSkeleton } from "@/components/learn/VisualTutorialSkeleton";
import { ArticleSkeleton } from "@/components/learn/ArticleSkeleton";

export default function LearnPage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Learn"
        title="Tutorial"
        description="Visual modules and a written article. Real content will land here later — for now this is the layout shell."
      />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Visual tutorial
        </h2>
        <VisualTutorialSkeleton />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Written article
        </h2>
        <ArticleSkeleton />
      </section>
    </div>
  );
}
