"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Section = { id: string; title: string };

export default function LegalLayout({
  title,
  lastUpdated,
  sections,
  children,
}: {
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Close mobile TOC when navigating anchors
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <main className="bg-neutral-50 text-neutral-900 dark:bg-[#0B0911] dark:text-neutral-100">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        {/* Header */}
        <header className="mb-8 border-b border-neutral-200 pb-6 dark:border-neutral-800">
          {/* Back navigation */}
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-[260px_1fr]">
          {/* TOC */}
          <aside className="md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:overflow-auto">
            {/* Mobile toggle */}
            <button
              className="mb-4 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-left text-sm dark:border-neutral-800 dark:bg-neutral-900 md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Hide contents" : "Show contents"}
            </button>

            <nav
              className={`${
                open ? "block" : "hidden md:block"
              } space-y-1 text-sm`}
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-md px-3 py-2 text-neutral-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900 hover:px-4 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="max-w-none text-[15px] leading-7">
            <div className="legal-content space-y-8 text-neutral-700 dark:text-neutral-300">
              {children}
            </div>
          </article>
        </div>

        {/* Footer meta */}
        <footer className="mt-16 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <p>
            © {new Date().getFullYear()} Zap by Sonetz Inc. All rights
            reserved.{" "}
            <Link
              href="/contact"
              className="text-violet-600 hover:underline dark:text-violet-400"
            >
              Contact us
            </Link>
            .
          </p>
        </footer>
      </div>
      
      {/* Custom styles for legal content */}
      <style jsx global>{`
        .legal-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.2;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          scroll-margin-top: 6rem;
        }
        
        .legal-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .legal-content p {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        
        .legal-content ul {
          margin-top: 0.5rem;
          margin-bottom: 0.75rem;
          padding-left: 1.25rem;
          list-style-type: disc;
        }
        
        .legal-content li {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        
        .legal-content strong {
          font-weight: 600;
        }
        
        .legal-content a {
          color: rgb(139 92 246);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .dark .legal-content a {
          color: rgb(196 181 253);
        }
        
        .legal-content a:hover {
          text-decoration: none;
        }
      `}</style>
    </main>
  );
}
