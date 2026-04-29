import { PlaceholderPanel } from "@/components/shared/PlaceholderPanel";

export function TraceSkeleton() {
  return (
    <PlaceholderPanel
      title="Visualization"
      subtitle="The interactive trace visualization will render here."
      minHeight={360}
    >
      <div className="flex h-full min-h-72 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 size-16 rounded-full border border-dashed border-slate-700" />
          <p className="text-sm text-slate-500">Visualization placeholder</p>
        </div>
      </div>
    </PlaceholderPanel>
  );
}
