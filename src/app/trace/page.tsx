import { TraceShell } from "@/components/trace/TraceShell";

function TraceHeroVisual() {
  const rows = Array.from({ length: 8 });
  const cols = [118, 190, 262, 334];
  const output = { x: 430, y: 115 };

  return (
    <svg viewBox="0 0 560 240" className="h-56 w-full text-cyan-400" aria-hidden="true">
      <defs>
        <linearGradient id="traceHeroLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
          <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="traceHeroBars" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {rows.map((_, i) => {
        const y = 42 + i * 20;
        return (
          <g key={i}>
            <path
              d={`M8 ${y} C 25 ${y - 16}, 39 ${y + 16}, 56 ${y} S 88 ${y - 16}, 104 ${y}`}
              fill="none"
              stroke="url(#traceHeroLine)"
              strokeWidth="1.2"
            />
            {cols.map((x, col) => (
              <circle key={x} cx={x} cy={y} r={2.8} fill="#22d3ee" opacity={0.55 + col * 0.1} />
            ))}
          </g>
        );
      })}

      {rows.map((_, row) => {
        const y = 42 + row * 20;
        return cols.slice(0, -1).flatMap((x, col) => {
          const nextX = cols[col + 1];
          const offset = col % 2 === 0 ? 20 : -20;
          const y2 = 42 + ((row + 2 + col) % rows.length) * 20;
          return [
            <line key={`${row}-${col}-a`} x1={x} y1={y} x2={nextX} y2={y2} stroke="#0ea5e9" strokeOpacity="0.55" strokeWidth="1" />,
            <line key={`${row}-${col}-b`} x1={x} y1={y} x2={nextX} y2={Math.max(32, Math.min(182, y + offset))} stroke="#22d3ee" strokeOpacity="0.32" strokeWidth="1" />,
          ];
        });
      })}

      {rows.map((_, i) => {
        const y = 42 + i * 20;
        return (
          <path
            key={`out-${i}`}
            d={`M334 ${y} C 365 ${y}, 390 ${115 + (y - 115) * 0.45}, ${output.x} ${output.y}`}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        );
      })}
      <circle cx={output.x} cy={output.y} r={5} fill="#22d3ee" />

      {Array.from({ length: 28 }).map((_, i) => {
        const h = 12 + ((i * 17) % 74);
        return (
          <rect
            key={i}
            x={462 + i * 3.1}
            y={196 - h}
            width="1.4"
            height={h}
            fill="url(#traceHeroBars)"
            opacity={0.18 + (i % 5) * 0.08}
          />
        );
      })}
    </svg>
  );
}

export default function TracePage() {
  return (
    <div className="space-y-8">
      <section className="grid items-center gap-8 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
        <header>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Trace
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
            Interactive FFT Trace
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            Step through recursive and iterative FFT on an 8-point input, with live variable inspection and highlighted code.
          </p>
        </header>
        <div className="hidden lg:block">
          <TraceHeroVisual />
        </div>
      </section>
      <TraceShell />
    </div>
  );
}
