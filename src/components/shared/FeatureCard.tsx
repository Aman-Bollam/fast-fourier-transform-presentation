import Link from "next/link";
import type { Accent } from "@/lib/placeholders";

const ACCENT_RING: Record<Accent, string> = {
  blue: "border-cyan-500/50 hover:border-cyan-400/70 hover:shadow-cyan-500/12",
  cyan: "border-cyan-500/50 hover:border-cyan-400/70 hover:shadow-cyan-500/12",
  emerald: "border-cyan-500/50 hover:border-cyan-400/70 hover:shadow-cyan-500/12",
};

const ACCENT_TITLE: Record<Accent, string> = {
  blue: "text-cyan-300",
  cyan: "text-cyan-300",
  emerald: "text-cyan-300",
};

const CTA_RING: Record<Accent, string> = {
  blue: "border-cyan-500/65 bg-[#031421] text-cyan-300 hover:border-cyan-300 hover:bg-[#061a2a] hover:text-cyan-100",
  cyan: "border-cyan-500/65 bg-[#031421] text-cyan-300 hover:border-cyan-300 hover:bg-[#061a2a] hover:text-cyan-100",
  emerald: "border-cyan-500/65 bg-[#031421] text-cyan-300 hover:border-cyan-300 hover:bg-[#061a2a] hover:text-cyan-100",
};

function IconGlyph({ title }: { title: string }) {
  if (title === "Learn") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 6.5c0-1.1.9-2 2-2h4.7c1 0 1.9.4 2.6 1.1l.2.2.2-.2c.7-.7 1.6-1.1 2.6-1.1h4.7c1.1 0 2 .9 2 2v10.8c0 .7-.5 1.2-1.2 1.2h-5.5c-1 0-2 .4-2.7 1l-.3.3-.3-.3c-.7-.7-1.7-1-2.7-1H4.7c-.7 0-1.2-.5-1.2-1.2Z" />
        <path d="M12 6.3v12" />
      </svg>
    );
  }
  if (title === "Trace") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 7 5 5-5 5" />
        <path d="M14 17h6" />
      </svg>
    );
  }
  if (title === "Practice") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="M13.5 5 10.5 19" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3.5h6l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6.5 3.5Z" />
      <path d="M14 3.5V9h5" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  );
}

function CardBackdrop({ title }: { title: string }) {
  if (title === "Learn") {
    return (
      <svg
        viewBox="0 0 320 180"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-36 w-48 opacity-65"
      >
        <defs>
          <linearGradient id="learnGrid" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 15 }).map((_, row) => (
          <path
            key={`r-${row}`}
            d={`M0 ${145 - row * 8} C 60 ${128 - row * 10}, 140 ${168 - row * 7}, 320 ${110 - row * 12}`}
            stroke="url(#learnGrid)"
            strokeWidth="1"
            fill="none"
            opacity={0.35 + row * 0.02}
          />
        ))}
        {Array.from({ length: 14 }).map((_, col) => (
          <path
            key={`c-${col}`}
            d={`M${70 + col * 18} 180 C ${90 + col * 12} 120, ${130 + col * 10} 85, ${180 + col * 8} 55`}
            stroke="#0ea5e9"
            strokeWidth="1"
            fill="none"
            opacity="0.28"
          />
        ))}
      </svg>
    );
  }
  if (title === "Trace") {
    return (
      <svg
        viewBox="0 0 320 180"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-32 w-56 opacity-65"
      >
        <defs>
          <linearGradient id="traceWave" x1="0" x2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((idx) => (
          <path
            key={idx}
            d={`M0 ${132 - idx * 16} C 35 ${126 - idx * 10}, 55 ${78 - idx * 9}, 88 ${108 - idx * 8} S 140 ${148 - idx * 8}, 174 ${96 - idx * 11} S 232 ${128 - idx * 10}, 320 ${68 - idx * 7}`}
            stroke="url(#traceWave)"
            strokeWidth={idx === 2 ? "2" : "1.2"}
            fill="none"
            opacity={0.45 + idx * 0.1}
          />
        ))}
        {Array.from({ length: 6 }).map((_, idx) => (
          <circle key={idx} cx={88 + idx * 36} cy={104 - (idx % 3) * 18} r="2.5" fill="#22d3ee" opacity="0.8" />
        ))}
      </svg>
    );
  }
  if (title === "Practice") {
    return (
      <svg
        viewBox="0 0 320 180"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-36 w-48 opacity-70"
      >
        <defs>
          <linearGradient id="practiceBars" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 22 }).map((_, idx) => {
          const height = 18 + (idx % 6) * 10 + idx * 2.6;
          return (
            <rect
              key={idx}
              x={12 + idx * 13}
              y={176 - height}
              width="5"
              height={height}
              rx="1.5"
              fill="url(#practiceBars)"
              opacity={0.4 + idx * 0.02}
            />
          );
        })}
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 320 180"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 z-0 h-36 w-52 opacity-65"
    >
      <defs>
        <linearGradient id="resourceMesh" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {[
        [18, 150], [62, 134], [108, 142], [152, 120], [194, 130], [236, 92], [278, 46], [312, 70],
      ].map(([x, y], idx, pts) => (
        <g key={idx}>
          {idx < pts.length - 1 && <line x1={x} y1={y} x2={pts[idx + 1][0]} y2={pts[idx + 1][1]} stroke="url(#resourceMesh)" strokeWidth="1.2" />}
          {idx < pts.length - 2 && <line x1={x} y1={y} x2={pts[idx + 2][0]} y2={pts[idx + 2][1]} stroke="#0ea5e9" strokeOpacity="0.28" strokeWidth="1" />}
          <circle cx={x} cy={y} r="2.2" fill="#22d3ee" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

export function FeatureCard({
  title,
  description,
  href,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  accent: Accent;
}) {
  return (
    <Link
      href={href}
      className={`group relative isolate flex min-h-[335px] flex-col overflow-hidden rounded-[1.65rem] border bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.92),_rgba(2,6,23,0.98)_68%)] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.03),0_24px_60px_rgba(2,6,23,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.14),0_28px_80px_rgba(2,6,23,0.7)] ${ACCENT_RING[accent]}`}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(8,145,178,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_32%)]" />
      <div className="absolute inset-x-8 bottom-0 z-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/45 bg-cyan-500/6 text-cyan-300 shadow-[inset_0_0_24px_rgba(14,165,233,0.08)]">
        <IconGlyph title={title} />
      </div>
      <h3 className={`relative z-10 mt-5 text-[2rem] font-semibold tracking-tight ${ACCENT_TITLE[accent]}`}>
        {title}
      </h3>
      <p className="relative z-10 mt-3 max-w-[16rem] text-[1.05rem] leading-8 text-slate-300/88">{description}</p>
      <div className="relative z-20 mt-8">
        <span
          className={`inline-flex items-center gap-3 rounded-xl border px-4 py-2 text-lg font-medium shadow-[0_12px_32px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(34,211,238,0.08)] transition-colors ${CTA_RING[accent]}`}
        >
          Open
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12" />
            <path d="m11 4 5 6-5 6" />
          </svg>
        </span>
      </div>
      <CardBackdrop title={title} />
    </Link>
  );
}
