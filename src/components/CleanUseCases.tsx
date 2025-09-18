"use client";

import { useState } from "react";
import { SiLinkedin, SiX, SiInstagram, SiYoutube } from "react-icons/si";
import { HiMiniPhoto, HiMiniPlay } from "react-icons/hi2";

type Deliverable =
  | { t: "linkedin" | "x" | "instagram" | "youtube"; count?: number }
  | { t: "image" | "reel" | "carousel"; count?: number };

type CaseItem = {
  id: string;
  title: string;
  poster: string; // /public/...
  prompt: string;
  tag?: "By prompt" | "With reference" | "On brand";
  deliverables: Deliverable[];
};

const ITEMS: CaseItem[] = [
  {
    id: "launch",
    title: "Launch Day Kit",
    poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop",
    prompt:
      "Create a launch pack for v2 on Friday. Founder voice. LinkedIn post, 5-tweet thread, IG caption, hero visual, and a 15s reel with a strong hook.",
    tag: "On brand",
    deliverables: [
      { t: "linkedin", count: 1 },
      { t: "x", count: 1 },
      { t: "instagram", count: 1 },
      { t: "image", count: 1 },
      { t: "reel", count: 1 },
    ],
  },
  {
    id: "weekly",
    title: "Weekly Brand Pack",
    poster: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=450&fit=crop",
    prompt:
      "Plan a week of content. 10 assets in a playful tone: posts, carousels, reels, and thumbnails that follow the brand palette.",
    tag: "On brand",
    deliverables: [
      { t: "linkedin", count: 3 },
      { t: "instagram", count: 3 },
      { t: "reel", count: 3 },
      { t: "image", count: 1 },
    ],
  },
  {
    id: "adstarter",
    title: "Ad Starter",
    poster: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=450&fit=crop",
    prompt:
      "Studio product shot of a smartwatch under a single spotlight. Minimal headline and short CTA. Export 1080×1080 and 1080×1920.",
    tag: "By prompt",
    deliverables: [
      { t: "image", count: 2 },
      { t: "instagram", count: 2 },
    ],
  },
  {
    id: "shorts",
    title: "Video → 5 Shorts",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=450&fit=crop",
    prompt:
      "Cut this 60s clip into 5 shorts. Add large kinetic captions and emojis where it helps. Suggest a title and CTA.",
    tag: "On brand",
    deliverables: [
      { t: "reel", count: 5 },
      { t: "youtube", count: 1 },
      { t: "x", count: 1 },
    ],
  },
  {
    id: "voice",
    title: "Voice Lock",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=450&fit=crop",
    prompt:
      "Learn this brand voice from two samples. Write future captions and scripts in the same tone and rhythm.",
    tag: "On brand",
    deliverables: [
      { t: "linkedin", count: 1 },
      { t: "instagram", count: 1 },
      { t: "x", count: 1 },
    ],
  },
  {
    id: "everywhere",
    title: "Post Everywhere",
    poster: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=450&fit=crop",
    prompt:
      "Prepare sizes and captions for X, Instagram, LinkedIn, YouTube, Pinterest, Reddit, Threads, Snapchat, Twitch, Medium, Substack, WhatsApp, Facebook, TikTok. Queue for peak time.",
    tag: "On brand",
    deliverables: [
      { t: "x" }, { t: "instagram" }, { t: "linkedin" }, { t: "youtube" }
    ],
  },
];

export default function CleanUseCases() {
  return (
    <section className="relative py-16">
      {/* content container */}
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          What you can do with one prompt
        </h2>
        <p className="mt-2 text-white/70">
          Visual first. Hover to see the raw prompt. Badges show what Zap delivers.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((c) => (
            <Card key={c.id} item={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

function Card({ item }: { item: CaseItem }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] backdrop-blur"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={item.poster} alt={item.title} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

        {/* top-left tag & prompt chip (truncated) */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {item.tag && (
            <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white/85 backdrop-blur">
              {item.tag}
            </span>
          )}
          <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white/85 backdrop-blur">
            Prompt
          </span>
        </div>

        {/* hover overlay with full prompt */}
        <div className={`absolute inset-0 flex items-end bg-black/0 p-4 transition ${hover ? "bg-black/45" : "pointer-events-none"}`}>
          <div className={`w-full rounded-2xl border border-white/15 bg-white/8 p-4 text-white/95 transition-opacity ${hover ? "opacity-100" : "opacity-0"}`}>
            <div className="text-[13px] leading-snug italic">&ldquo;{item.prompt}&rdquo;</div>
          </div>
        </div>
      </div>

      {/* title + compact badges */}
      <div className="p-5">
        <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          {item.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-6">
          {item.deliverables.map((d, i) => (
            <Badge key={i} d={d} />
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- Badges ---------- */

function Badge({ d }: { d: Deliverable }) {
  const common = "inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[.06] px-2.5 py-1 text-xs text-white/85";
  const count = d.count ? `×${d.count}` : "";
  if (d.t === "linkedin") return <span className={common}><SiLinkedin /> LinkedIn {count}</span>;
  if (d.t === "x")        return <span className={common}><SiX /> X {count}</span>;
  if (d.t === "instagram")return <span className={common}><SiInstagram /> IG {count}</span>;
  if (d.t === "youtube")  return <span className={common}><SiYoutube /> YouTube {count}</span>;
  if (d.t === "reel")     return <span className={common}><HiMiniPlay /> Reels {count}</span>;
  if (d.t === "carousel") return <span className={common}><HiMiniPhoto /> Carousel {count}</span>;
  return <span className={common}><HiMiniPhoto /> Image {count}</span>;
}
