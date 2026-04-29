import { PlaceholderPanel } from "@/components/shared/PlaceholderPanel";
import { VISUAL_TUTORIAL_MODULES } from "@/lib/placeholders";

export function VisualTutorialSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {VISUAL_TUTORIAL_MODULES.map((m) => (
        <PlaceholderPanel
          key={m.title}
          title={m.title}
          subtitle={m.subtitle}
          minHeight={180}
        />
      ))}
    </div>
  );
}
