import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming soon — Zap",
  description: "We're shipping this page next. Leave your email and we'll notify you the moment it's live.",
};

export default function ComingSoon() {
  return (
    <main className="relative min-h-screen bg-[#0B0911] text-white flex flex-col">
      {/* Enhanced gradient background - matching other pages */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundImage: [
            "radial-gradient(60rem 40rem at 10% -10%, rgba(170,115,255,.18), transparent 55%)",
            "radial-gradient(40rem 30rem at 90% -10%, rgba(120,80,255,.18), transparent 60%)",
            "radial-gradient(80rem 60rem at 30% 50%, rgba(15,8,25,.4), transparent 70%)",
            "radial-gradient(70rem 50rem at 70% 80%, rgba(120,80,255,.15), transparent 60%)",
            "linear-gradient(180deg, rgba(12,8,18,0.95) 0%, rgba(9,7,12,1) 50%, rgba(8,6,11,1) 100%)"
          ].join(", "),
        }}
      />

      {/* Header - Same as main landing page */}
      <header className="sticky top-0 z-40 transition-all duration-300 backdrop-blur-none border-b border-transparent">
        {/* Gradient background that appears on scroll */}
        <div 
          className="absolute inset-0 -z-10 opacity-0"
          style={{
            backgroundImage: [
              "radial-gradient(40rem 20rem at 10% -10%, rgba(170,115,255,.12), transparent 50%)",
              "radial-gradient(30rem 15rem at 90% -10%, rgba(120,80,255,.10), transparent 55%)",
              "linear-gradient(180deg, rgba(12,8,18,0.85) 0%, rgba(9,7,12,0.95) 100%)"
            ].join(", "),
          }}
        />
        
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo with enhanced styling */}
          <Link href="/" className="flex items-center gap-3 transition-all duration-200 hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-lg">
              <img src="/zap logo Background Removed.png" alt="Zap" className="h-6 w-6 object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent" style={{fontFamily:"var(--font-display)"}}>Zap</span>
          </Link>
          
          {/* Enhanced navigation */}
          <nav className="hidden gap-8 md:flex text-white/75">
            <a href="/gallery" className="transition-all duration-200 hover:text-white hover:scale-105">Explore</a>
            <a href="/pricing" className="transition-all duration-200 hover:text-white hover:scale-105">Pricing</a>
            <a href="/blog" className="transition-all duration-200 hover:text-white hover:scale-105">Blog</a>
          </nav>
          
          {/* Modern CTA button */}
          <a href="https://zap.sonetz.com/" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10">
            <span className="relative z-10">Get started</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#AC7BFF]/20 to-[#7A4DFF]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        </div>
      </header>

      {/* Hero - Centered content */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] drop-shadow"
              style={{fontFamily:"var(--font-display)"}}>
            Coming soon
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            We&apos;re shipping this page next.
          </p>

          {/* CTA Button */}
          <div className="mt-7">
            <a
              href="https://zap.sonetz.com/"
              className="inline-flex h-16 items-center justify-center rounded-2xl bg-[#7A4DFF] px-8 text-base font-medium text-white 
                         shadow-[0_12px_40px_rgba(122,77,255,.4)] transition-all duration-200 
                         hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(122,77,255,.5)]"
            >
              Try Zap for free
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Fixed at bottom */}
      <footer className="mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <p className="text-sm text-white/50">© 2025 Zap by Sonetz Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-white/50 hover:text-white/80 transition">Privacy</a>
            <a href="/terms" className="text-sm text-white/50 hover:text-white/80 transition">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
