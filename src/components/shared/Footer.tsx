export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800/80 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-slate-500">
        <p>Fast Fourier Transform Lab — interactive competitive programming tutorial.</p>
        <p>© {year}</p>
      </div>
    </footer>
  );
}
