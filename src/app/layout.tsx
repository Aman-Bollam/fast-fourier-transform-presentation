import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Fast Fourier Transform Lab",
  description:
    "An interactive competitive programming tutorial for the Fast Fourier Transform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen antialiased">
        <div
          aria-hidden
          className="app-gradient pointer-events-none fixed inset-0 -z-10"
        />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
