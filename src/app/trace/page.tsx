import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlaceholderPanel } from "@/components/shared/PlaceholderPanel";
import { TraceSkeleton } from "@/components/trace/TraceSkeleton";
import { TraceControls } from "@/components/trace/TraceControls";
import { VariablePanel } from "@/components/trace/VariablePanel";
import { LOREM } from "@/lib/placeholders";

export default function TracePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Trace"
        title="Interactive Trace"
        description="A generic trace workspace. Algorithm-specific traces will be added as separate routes later."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <TraceSkeleton />
          <PlaceholderPanel
            title="Code"
            subtitle="Code snippet for the current trace will render here."
            minHeight={180}
          >
            <pre className="font-mono text-sm text-slate-500 whitespace-pre-wrap">
{`// code snippet placeholder
function trace(input) {
  // step-by-step execution will appear here
}`}
            </pre>
          </PlaceholderPanel>
        </div>

        <div className="space-y-6">
          <PlaceholderPanel
            title="Step Explanation"
            subtitle="Narrative for the current step in the trace."
            minHeight={220}
          >
            <p className="text-sm text-slate-400 leading-relaxed">{LOREM}</p>
          </PlaceholderPanel>
          <VariablePanel />
        </div>
      </div>

      <TraceControls />
    </div>
  );
}
