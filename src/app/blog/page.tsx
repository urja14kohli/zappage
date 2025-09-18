/* Dark blog page for Zap
   - Mountain-style hero image strip
   - Simple SEO-friendly cards
   - Brand accent via CSS var --zap (fallback included)
*/

"use client";

import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import FooterMega from "@/components/FooterMega";

type Post = {
  slug: string;
  title: string;
  category: "Case study" | "Guide" | "Comparison" | "Playbook";
  date: string; // ISO
  readMin: number;
  cover: string; // /public/blog/...
  excerpt: string;
  tags: string[];
};

const POSTS: Post[] = [
  {
    slug: "300k-views-in-20-days",
    title: "300k views in 20 days with a fresh account",
    category: "Case study",
    date: "2025-06-20",
    readMin: 6,
    cover: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    excerpt:
      "We used Zap to plan hooks, map the week, and push to 6 channels. Here is the full playbook and the exact prompts.",
    tags: ["growth", "shorts", "hooks"],
  },
  {
    slug: "falcon-video-best-prompts",
    title: "Best prompts for Zap Falcon video model",
    category: "Playbook",
    date: "2025-06-16",
    readMin: 7,
    cover: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&h=400&fit=crop",
    excerpt:
      "Copy these prompts for product reels, founder cuts, and UGC edits. Each one tested on real posts.",
    tags: ["video", "reels", "prompts"],
  },
  {
    slug: "zap-vs-others",
    title: "Zap vs the usual social tools",
    category: "Comparison",
    date: "2025-06-12",
    readMin: 5,
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    excerpt:
      "See what changes when content, brand voice, and posting live in one place. Simple charts inside.",
    tags: ["comparison", "workflow"],
  },
  {
    slug: "viral-reel-breakdown",
    title: "This reel went viral: simple breakdown",
    category: "Case study",
    date: "2025-06-10",
    readMin: 4,
    cover: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    excerpt:
      "Hook, pattern break, value, and the close. We show the cut points and the captions that moved the needle.",
    tags: ["reels", "editing", "hooks"],
  },
  {
    slug: "brand-voice-in-10-min",
    title: "Lock your brand voice in 10 minutes",
    category: "Guide",
    date: "2025-06-05",
    readMin: 5,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    excerpt:
      "Paste two samples, pick a tone, and preview. Zap will keep that voice across posts, scripts, and captions.",
    tags: ["brand", "writing"],
  },
  {
    slug: "one-idea-ten-formats",
    title: "Remix one idea into ten formats",
    category: "Playbook",
    date: "2025-06-01",
    readMin: 6,
    cover: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    excerpt:
      "Turn a single message into a thread, a reel, a carousel, and more. Here is the step by step inside Zap.",
    tags: ["repurpose", "formats"],
  },
];

export default function BlogPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"All" | Post["category"]>("All");

  const shown = useMemo(() => {
    const t = tab === "All" ? POSTS : POSTS.filter(p => p.category === tab);
    if (!q.trim()) return t;
    const s = q.toLowerCase();
    return t.filter(p =>
      [p.title, p.excerpt, p.tags.join(" ")].join(" ").toLowerCase().includes(s)
    );
  }, [q, tab]);

  return (
    <>
      {/* UNIFIED PAGE BACKGROUND */}
      <div className="relative min-h-screen">
        {/* Global smooth gradient */}
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
        
        <Header />

    <main className="relative overflow-hidden text-white">
      {/* brand accent var */}
      <style>{`:root{--zap:#AC7BFF}`}</style>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[.2em] text-[#AC7BFF]">ZAP BLOG</p>
          <h1
            className="mt-2 text-4xl font-semibold leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Insights, ideas, and simple playbooks
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Short, clear posts on content that grows. Prompts included.
          </p>
        </div>

        {/* Hero ridge (mountain images) */}
        <div className="mt-10">
          {/* bottom fade for the whole strip */}
          <style>{`
            .ridge-fade {
              mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%);
              -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%);
            }
          `}</style>
          <div className="ridge-fade grid grid-cols-5 gap-3 md:grid-cols-7 md:gap-5">
            {/* heights climb to a peak then ease down */}
            <RidgeImage src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop" h="clamp(6rem,10vw,7.5rem)" />
            <RidgeImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" h="clamp(7rem,12vw,9rem)" />
            <RidgeImage src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=400&h=600&fit=crop" h="clamp(9rem,16vw,12rem)" />
            <RidgeImage src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop" h="clamp(12rem,20vw,15rem)" peak />
            <RidgeImage src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop" h="clamp(9rem,16vw,12rem)" />
            <RidgeImage src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop" h="clamp(7rem,12vw,9rem)" className="hidden md:block" />
            <RidgeImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" h="clamp(6rem,10vw,7.5rem)" className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* Filters + search */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-3">
          {(["All", "Case study", "Guide", "Comparison", "Playbook"] as const).map(c => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                tab === c
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-white/[.04] hover:bg-white/[.08]"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-sm text-white/80 md:w-80">
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5M9.5 14C7 14 5 12 5 9.5S7 5 9.5 5 14 7 14 9.5 12 14 9.5 14Z"/></svg>
            <input
              placeholder="Search posts"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-white/50"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto mt-8 max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map(p => <PostCard key={p.slug} post={p} />)}
        </div>
      </section>

      {/* SEO: list of posts */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Zap Blog",
            description: "Simple guides and case studies on content that grows.",
            blogPost: POSTS.map(p => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.date,
              url: `https://yourdomain.com/blog/${p.slug}`,
              image: `https://yourdomain.com${p.cover}`,
              articleSection: p.category,
              description: p.excerpt,
            })),
          }),
        }}
      />
    </main>
        
        <FooterMega />
      </div>
    </>
  );
}

/* ---------- tiny pieces ---------- */

function RidgeImage({ src, h, peak, className }: { src: string; h: string; peak?: boolean; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[.06] backdrop-blur ${
        peak ? "shadow-[0_30px_120px_rgba(172,123,255,.25)]" : ""
      } ${className || ""}`}
      style={{ height: h }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] backdrop-blur">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white/85 backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="p-5">
        <h3
          className="text-xl font-semibold leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <a href={`/blog/${post.slug}`} className="hover:text-[color:var(--zap)]">
            {post.title}
          </a>
        </h3>

        <p className="mt-2 line-clamp-3 text-white/75">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-white/60">
          <span>{formatDate(post.date)} • {post.readMin} min read</span>
          <a href={`/blog/${post.slug}`} className="text-[color:var(--zap)] hover:opacity-90">
            Read
          </a>
        </div>
      </div>
    </article>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}