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
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur overflow-hidden">
      <header className="px-5 py-4 border-b border-slate-800 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">{template.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{template.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={template.language === "cpp" ? "blue" : "purple"}>
            {template.language === "cpp" ? "C++" : "Python"}
          </Badge>
          <CopyButton text={template.code} />
        </div>
      </header>
      <pre className="overflow-x-auto p-5 text-xs font-mono text-slate-300 leading-relaxed max-h-80 bg-slate-950/50">
        <code>{template.code}</code>
      </pre>
    </article>
  );
}
