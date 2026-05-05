import Link from "next/link";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PresentationDeck } from "@/components/home/PresentationDeck";
import { FftHeroVisual } from "@/components/home/FftHeroVisual";
import { ASSIGNMENT_MAP, FEATURE_CARDS } from "@/lib/placeholders";

function SectionWaveIcon() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 14h3l2.3-6 4.2 12 4-12 3 9 2.3-6h4.2" />
    </svg>
  );
}

function SectionClipboardIcon() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="5.5" width="14" height="18" rx="2.2" />
      <path d="M11 5.5h6v-1a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 11 4.5Z" />
      <path d="M10.5 11h7" />
      <path d="M10.5 15h7" />
      <path d="M10.5 19h4.5" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 28 28" className="h-6 w-6 -translate-y-px" fill="currentColor" aria-hidden="true">
      <path d="M7.8 9.2c0-2.6 1.8-4.4 4.4-4.4v2.4c-1.3.1-2 1-2.1 2h2.1v6H6.8v-6Zm8 0c0-2.6 1.8-4.4 4.4-4.4v2.4c-1.3.1-2 1-2.1 2h2.1v6h-5.4v-6Z" />
    </svg>
  );
}

function RowIcon({ label }: { label: string }) {
  if (label === "Tutorial") {
    return (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m4 11 10-5 10 5-10 5-10-5Z" />
        <path d="M7 13.5V18c0 1.4 3.1 3 7 3s7-1.6 7-3v-4.5" />
      </svg>
    );
  }
  if (label === "Examples") {
    return (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 20.5h18" />
        <path d="m7.5 17 4.2-4.2 3.2 3.2 5.6-6.3" />
        <path d="M18 9.7h3.5v3.6" />
      </svg>
    );
  }
  if (label === "Practice Problems") {
    return (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 9-5 5 5 5" />
        <path d="m19 9 5 5-5 5" />
        <path d="m16 6-4 16" />
      </svg>
    );
  }
  return <QuoteIcon />;
}

function DestinationIcon({ label }: { label: string }) {
  if (label === "Learn") {
    return (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 7.5c0-1 .8-1.8 1.8-1.8h5c1.1 0 2.1.4 2.8 1.1.7-.7 1.7-1.1 2.8-1.1h5c1 0 1.8.8 1.8 1.8V21c0 .6-.5 1.1-1.1 1.1H17c-1.1 0-2.1.4-2.8 1.1-.7-.7-1.7-1.1-2.8-1.1H5.6c-.6 0-1.1-.5-1.1-1.1Z" />
        <path d="M14 6.8v15" />
      </svg>
    );
  }
  if (label === "Trace") {
    return (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8 6 6-6 6" />
        <path d="M16 20h5" />
      </svg>
    );
  }
  if (label === "Practice") {
    return (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10 9-5 5 5 5" />
        <path d="m18 9 5 5-5 5" />
        <path d="m16 6-4 16" />
      </svg>
    );
  }
  return <QuoteIcon />;
}

function AssignmentPill({ label }: { label: string }) {
  return (
    <span className="inline-flex min-w-[16rem] items-center justify-start gap-3 rounded-xl border border-cyan-500/25 bg-cyan-500/6 px-5 py-2 text-left text-xl font-medium text-cyan-300 shadow-[inset_0_0_24px_rgba(14,165,233,0.06)]">
      <DestinationIcon label={label} />
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="pt-6 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Interactive Tutorial
            </p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.05]">
              <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Fast Fourier
              </span>
              <br />
              <span className="text-slate-100">Transform Lab</span>
            </h1>
            <p className="mt-6 max-w-md text-base sm:text-lg text-slate-400 leading-relaxed">
              An interactive competitive programming tutorial for the Fast Fourier
              Transform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href="/trace"
                className="rounded-lg border border-cyan-500/40 hover:border-cyan-400/70 hover:bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-200 transition-colors"
              >
                View Trace
              </Link>
              <Link
                href="/practice"
                className="rounded-lg border border-cyan-500/40 hover:border-cyan-400/70 hover:bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-200 transition-colors"
              >
                Practice
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2">
            <FftHeroVisual />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100 mb-4">
          Overview
        </h2>
        <PresentationDeck />
      </section>

      <section>
        <div className="mb-7 flex items-start gap-4">
          <div className="mt-1">
            <SectionWaveIcon />
          </div>
          <div>
            <h2 className="text-[2.2rem] font-semibold tracking-tight text-slate-100">
              Explore the lab
            </h2>
            <p className="mt-1 text-[1.05rem] text-slate-400">
              Everything you need to master the Fast Fourier Transform.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.href} {...card} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-7 flex items-start gap-4">
          <div className="mt-1">
            <SectionClipboardIcon />
          </div>
          <div>
            <h2 className="text-[2.2rem] font-semibold tracking-tight text-slate-100">
              Assignment mapping
            </h2>
            <p className="mt-1 text-[1.05rem] text-slate-400">
              Find the right section for each part of the tutorial.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.9rem] border border-cyan-500/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.97))] shadow-[0_18px_60px_rgba(2,6,23,0.45)] backdrop-blur">
          <ul className="divide-y divide-slate-800/80">
            {ASSIGNMENT_MAP.map((row) => (
              <li
                key={row.left}
                className="group relative grid gap-5 px-6 py-5 lg:grid-cols-[minmax(0,1.45fr)_auto_minmax(0,1fr)_auto] lg:items-center"
              >
                <div className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-cyan-400/90 to-transparent" />
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/6 text-cyan-300 shadow-[inset_0_0_26px_rgba(14,165,233,0.06)]">
                    <RowIcon label={row.left} />
                  </div>
                  <div>
                    <p className="text-[1.05rem] font-semibold text-slate-100">{row.left}</p>
                    <p className="mt-1 text-sm text-slate-400">{row.description}</p>
                  </div>
                </div>
                <span className="hidden text-3xl text-slate-400 lg:inline">→</span>
                <Link
                  href={row.href}
                  className="justify-self-start lg:justify-self-center"
                >
                  <AssignmentPill label={row.right} />
                </Link>
                <Link
                  href={row.href}
                  className="inline-flex items-center gap-3 justify-self-start text-lg font-medium text-cyan-300 transition-colors hover:text-cyan-100 lg:justify-self-end"
                >
                  Open
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12" />
                    <path d="m11 4 5 6-5 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
