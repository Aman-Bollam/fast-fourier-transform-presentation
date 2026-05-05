import { Badge } from "@/components/shared/Badge";
import { CopyButton } from "./CopyButton";

interface CodeTemplateData {
  id: string;
  title: string;
  language: "cpp" | "python";
  description: string;
  code: string;
}

export function CodeTemplate({ template }: { template: CodeTemplateData }) {
  return (
    <article className="overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-950/45 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      <header className="flex items-start justify-between gap-3 border-b border-slate-800/80 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">{template.title}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{template.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant={template.language === "cpp" ? "blue" : "cyan"}>
            {template.language === "cpp" ? "C++" : "Python"}
          </Badge>
          <CopyButton text={template.code} />
        </div>
      </header>
      <pre className="max-h-[520px] overflow-x-auto bg-slate-950/62 p-5 text-xs font-mono leading-relaxed text-slate-300">
        <code>{template.code}</code>
      </pre>
    </article>
  );
}
