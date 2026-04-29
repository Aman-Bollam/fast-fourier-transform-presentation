import type { CSSProperties, ReactNode } from "react";

export function PlaceholderPanel({
  title,
  subtitle,
  minHeight,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  minHeight?: number | string;
  children?: ReactNode;
  className?: string;
}) {
  const style: CSSProperties | undefined =
    minHeight !== undefined ? { minHeight } : undefined;
  return (
    <section
      style={style}
      className={`rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 backdrop-blur p-6 flex flex-col ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              {title}
            </h3>
          )}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </header>
      )}
      <div className="flex-1">
        {children ?? (
          <div className="flex h-full min-h-24 items-center justify-center text-sm text-slate-500">
            Placeholder
          </div>
        )}
      </div>
    </section>
  );
}
