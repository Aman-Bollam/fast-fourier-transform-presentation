export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">{description}</p>
      )}
    </header>
  );
}
