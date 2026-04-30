"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/trace", label: "Trace" },
  { href: "/practice", label: "Practice" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-block size-2 rounded-full bg-linear-to-br from-blue-400 to-purple-500" />
          <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-white">
            Fast Fourier Transform Lab
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "text-slate-100 bg-slate-800/60"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer rounded-md border border-slate-800 px-3 py-1.5 text-sm text-slate-300">
            Menu
          </summary>
          <ul className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-800 bg-slate-900 shadow-lg p-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
