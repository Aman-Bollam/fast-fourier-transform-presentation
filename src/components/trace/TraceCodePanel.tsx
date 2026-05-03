import { STEP_COLORS } from "@/lib/fftTrace";

interface TraceCodePanelProps {
  code: string;
  highlightLine: number;
  annotations: Record<number, string>;
  stepKind: string;
}

export function TraceCodePanel({ code, highlightLine, annotations, stepKind }: TraceCodePanelProps) {
  const lines = code.split("\n");
  const colors = STEP_COLORS[stepKind] ?? STEP_COLORS["call"];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Code</p>
        <p className="text-xs text-slate-600">← annotation</p>
      </div>
      <pre className="overflow-x-auto text-xs leading-6 p-0">
        {lines.map((line, i) => {
          const isActive = i === highlightLine;
          const annotation = annotations[i];
          return (
            <div
              key={i}
              className={`px-3 flex items-start gap-2 border-l-2 ${
                isActive
                  ? `${colors.activeBg} ${colors.activeBorder}`
                  : "border-transparent"
              }`}
            >
              {/* Line number */}
              <span className="select-none text-slate-600 w-5 shrink-0 text-right mt-0.5">
                {i + 1}
              </span>
              {/* Code */}
              <span className={`flex-1 whitespace-pre ${isActive ? colors.activeText : "text-slate-400"}`}>
                {line}
              </span>
              {/* Annotation */}
              {annotation && (
                <span
                  className={`shrink-0 text-right italic max-w-[200px] truncate mt-0.5 ${
                    isActive ? `${colors.activeText} opacity-90` : "text-slate-600"
                  }`}
                  title={annotation}
                >
                  {annotation}
                </span>
              )}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
