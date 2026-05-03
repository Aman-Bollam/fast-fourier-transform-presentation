import Link from "next/link";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PresentationDeck } from "@/components/home/PresentationDeck";
import { ASSIGNMENT_MAP, FEATURE_CARDS } from "@/lib/placeholders";

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="pt-6 sm:pt-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
          Interactive Tutorial
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-slate-100 leading-[1.05]">
          Fast Fourier{" "}
          <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
            Transform Lab
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
          An interactive competitive programming tutorial for the Fast Fourier Transform.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="rounded-lg bg-blue-500/90 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors"
          >
            Start Learning
          </Link>
          <Link
            href="/trace"
            className="rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors"
          >
            View Trace
          </Link>
          <Link
            href="/practice"
            className="rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors"
          >
            Practice
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100 mb-4">
          Overview
        </h2>
        <PresentationDeck />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100 mb-6">
          Explore the lab
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.href} {...card} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100 mb-6">
          Assignment mapping
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <ul className="divide-y divide-slate-800">
            {ASSIGNMENT_MAP.map((row) => (
              <li
                key={row.left}
                className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-4 px-5 py-4"
              >
                <span className="text-slate-300">{row.left}</span>
                <span className="text-slate-500">→</span>
                <Link
                  href={row.href}
                  className="text-blue-300 hover:text-blue-200 font-medium"
                >
                  {row.right}
                </Link>
                <span className="text-xs text-slate-500 hidden sm:inline">Open →</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
