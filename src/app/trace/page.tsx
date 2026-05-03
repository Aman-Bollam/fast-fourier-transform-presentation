import { SectionHeader } from "@/components/shared/SectionHeader";
import { TraceShell } from "@/components/trace/TraceShell";

export default function TracePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Trace"
        title="Interactive FFT Trace"
        description="Step through recursive and iterative FFT on an 8-point input, with live variable inspection and highlighted code."
      />
      <TraceShell />
    </div>
  );
}
