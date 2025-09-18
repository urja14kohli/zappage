"use client";

import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import ExploreStripMarquee from "@/components/ExploreStripMarquee";
import FooterMega from "@/components/FooterMega";

/** ------------------ Types & Data ------------------ */

type Model = "All" | "Sora" | "Veo 3" | "NanoBanana" | "DALL·E" | "Stable Diffusion";
type Category =
  | "Images"
  | "Reels"
  | "Ads"
  | "Product Showcase"
  | "Brand Story"
  | "Reference Match"
  | "Posts / Carousels";

type MediaType = "image" | "video";

type Item = {
  id: string;
  title: string;
  category: Category;
  model: Exclude<Model, "All">;
  mediaType: MediaType;
  src: string;          // image path or video poster
  videoSrc?: string;    // optional for video
  aspect?: "square" | "portrait" | "landscape";
  prompt: string;
  likes?: number;
};

const ITEMS: Item[] = [
  // -------- Images (prompt-only) --------
  {
    id: "img-hero-sneaker",
    title: "Sneaker hero on neon blocks",
    category: "Images",
    model: "DALL·E",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "Studio-quality hero image of a sneaker on floating neon blocks, crisp light, 4:5",
    likes: 312,
  },
  {
    id: "img-flatlay-skin",
    title: "Skincare pastel flatlay",
    category: "Images",
    model: "Stable Diffusion",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    aspect: "square",
    prompt: "Minimalist product flatlay for a skincare brand with pastel background and soft shadow",
    likes: 201,
  },
  {
    id: "img-tech-workspace",
    title: "Tech workspace aesthetic",
    category: "Images",
    model: "DALL·E",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    aspect: "square",
    prompt: "Clean tech workspace with MacBook, coffee, and minimal decor in natural light",
    likes: 189,
  },
  // -------- Images (with reference) --------
  {
    id: "img-ref-banner",
    title: "Brand banner (ref-match)",
    category: "Reference Match",
    model: "NanoBanana",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=300&fit=crop",
    aspect: "landscape",
    prompt: "Match this brand's palette and fonts to make a new Instagram ad banner",
    likes: 91,
  },
  {
    id: "img-ref-product",
    title: "Product style match",
    category: "Reference Match",
    model: "Stable Diffusion",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    aspect: "square",
    prompt: "Recreate this product photography style for our new headphones launch",
    likes: 156,
  },

  // -------- Product Showcase --------
  {
    id: "prod-watch-rotate",
    title: "Smartwatch under spotlight",
    category: "Product Showcase",
    model: "Veo 3",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=300&fit=crop",
    aspect: "landscape",
    prompt: "Dynamic video showing a smartwatch rotating under a sharp top spotlight, 16:9",
    likes: 458,
  },
  {
    id: "prod-coffee-pour",
    title: "Coffee brewing showcase",
    category: "Product Showcase",
    model: "Sora",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "Slow-motion coffee brewing process with steam and golden hour lighting",
    likes: 342,
  },

  // -------- Brand Story --------
  {
    id: "story-founder",
    title: "Founder story cut",
    category: "Brand Story",
    model: "Sora",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "1-minute founder story with cut-scenes, intimate lighting, motivating voiceover, end on CTA",
    likes: 377,
  },
  {
    id: "story-team",
    title: "Behind the scenes team",
    category: "Brand Story",
    model: "Veo 3",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop",
    aspect: "landscape",
    prompt: "Authentic team collaboration moments with natural conversations and workspace energy",
    likes: 298,
  },

  // -------- Ads --------
  {
    id: "ad-fitness",
    title: "Fitness app ad",
    category: "Ads",
    model: "Sora",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "Ad video for a fitness app: start with frustration, show quick fix, end with confidence + CTA",
    likes: 245,
  },
  {
    id: "ad-productivity",
    title: "Productivity tool ad",
    category: "Ads",
    model: "Veo 3",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "Transform chaos to clarity: messy desk to organized workspace in 15 seconds",
    likes: 187,
  },

  // -------- Reels --------
  {
    id: "reel-founder-burnout",
    title: "15s founder burnout reel",
    category: "Reels",
    model: "Veo 3",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "15-second Reel that hooks with 'startup founder struggles' then flips positive; captions on",
    likes: 529,
  },
  {
    id: "reel-productivity-hack",
    title: "Daily productivity hack",
    category: "Reels",
    model: "Sora",
    mediaType: "video",
    src: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=400&h=600&fit=crop",
    aspect: "portrait",
    prompt: "Quick productivity tip with before/after visuals and trending audio",
    likes: 423,
  },

  // -------- Posts / Carousels --------
  {
    id: "carousel-lifestyle",
    title: "Lifestyle product carousel",
    category: "Posts / Carousels",
    model: "DALL·E",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=300&fit=crop",
    aspect: "landscape",
    prompt: "Instagram carousel showing three angles of the same product in lifestyle settings, brand colors",
    likes: 118,
  },
  {
    id: "carousel-tips",
    title: "5 productivity tips carousel",
    category: "Posts / Carousels",
    model: "Stable Diffusion",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop",
    aspect: "square",
    prompt: "Clean infographic-style carousel with 5 productivity tips, consistent visual hierarchy",
    likes: 267,
  },
];

// Hero corridor items - curated selection
/* const HERO_ITEMS = [
  {
    id: "hero-1",
    title: "Smartwatch under spotlight",
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
    prompt: "Dynamic video showing a smartwatch rotating under a sharp top spotlight, 16:9",
    isVideo: true,
    badge: "Veo 3",
  },
  {
    id: "hero-2", 
    title: "Founder story cut",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    prompt: "1-minute founder story with cut-scenes, intimate lighting, motivating voiceover, end on CTA",
    isVideo: true,
    badge: "Sora",
  },
  {
    id: "hero-3",
    title: "Sneaker hero on neon blocks",
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop",
    prompt: "Studio-quality hero image of a sneaker on floating neon blocks, crisp light, 4:5",
    badge: "DALL·E",
  },
  {
    id: "hero-4",
    title: "Skincare pastel flatlay",
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop",
    prompt: "Minimalist product flatlay for a skincare brand with pastel background and soft shadow",
    badge: "Stable Diffusion",
  },
  {
    id: "hero-5",
    title: "Brand banner (ref-match)",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=800&fit=crop",
    prompt: "Match this brand's palette and fonts to make a new Instagram ad banner",
    badge: "NanoBanana",
  },
  {
    id: "hero-6",
    title: "Fitness app ad",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",
    prompt: "Ad video for a fitness app: start with frustration, show quick fix, end with confidence + CTA",
    isVideo: true,
    badge: "Sora",
  },
  {
    id: "hero-7",
    title: "15s founder burnout reel",
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=800&fit=crop",
    prompt: "15-second Reel that hooks with 'startup founder struggles' then flips positive; captions on",
    isVideo: true,
    badge: "Veo 3",
  },
]; */

/** ------------------ UI Helpers ------------------ */

const MODELS: Model[] = ["All", "Sora", "Veo 3", "NanoBanana", "DALL·E", "Stable Diffusion"];
const CATS: Category[] = [
  "Images",
  "Reels", 
  "Ads",
  "Product Showcase",
  "Brand Story",
  "Reference Match",
  "Posts / Carousels",
];

/* function aspectClass(a?: Item["aspect"]) {
  switch (a) {
    case "portrait":
      return "aspect-[9/16]";
    case "landscape":
      return "aspect-[16/9]";
    case "square":
    default:
      return "aspect-square";
  }
} */

/** ------------------ Page ------------------ */

export default function GalleryPage() {
  const [model, setModel] = useState<Model>("All");
  const [q, setQ] = useState("");

  const filteredCategories = useMemo(() => {
    return CATS.map(cat => ({
      category: cat,
      items: filtered(ITEMS, { cat, model, q })
    })).filter(({ items }) => items.length > 0);
  }, [model, q]);

  // const totalItems = useMemo(() => {
  //   return filteredCategories.reduce((sum, { items }) => sum + items.length, 0);
  // }, [filteredCategories]);

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

    <main className="relative text-white">
      {/* Brand accent var */}
      <style>{`:root{--zap:#AC7BFF}`}</style>

      {/* Explore Strip Marquee Hero */}
      <div className="pt-8">
        <ExploreStripMarquee />
      </div>

      {/* Controls Section */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3 backdrop-blur">
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5M9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"
              />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles or prompts…"
              className="w-full bg-transparent text-white/90 outline-none placeholder:text-white/50"
            />
          </div>

          {/* Model filters */}
          <div className="flex flex-wrap items-center gap-2">
            {MODELS.map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  model === m
                    ? "border-[#AC7BFF]/50 bg-[#AC7BFF]/20 text-white shadow-lg shadow-[#AC7BFF]/20"
                    : "border-white/10 bg-white/[.06] text-white/75 hover:border-white/20 hover:bg-white/[.1] hover:text-white"
                }`}
              >
                {m}
          </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lanes */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        {filteredCategories.map(({ category, items }) => (
          <Lane key={category} title={category} items={items} />
        ))}
        
        {filteredCategories.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-50">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5M9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"
                />
              </svg>
      </div>
            <h3 className="text-xl font-semibold text-white/80" style={{ fontFamily: "var(--font-display)" }}>
              No results found
            </h3>
            <p className="mt-2 text-white/60">
              Try adjusting your search or filter criteria
            </p>
      </div>
        )}
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Zap AI Gallery",
            description: "Showcase of AI-generated content across multiple models and formats",
            numberOfItems: ITEMS.length,
            itemListElement: ITEMS.map((item, index) => ({
              "@type": "CreativeWork",
              position: index + 1,
              name: item.title,
              description: item.prompt,
              creator: {
                "@type": "SoftwareApplication",
                name: item.model,
              },
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

/** ------------------ Components ------------------ */

function Lane({ title, items }: { title: string; items: Item[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2
          className="text-2xl font-bold tracking-tight md:text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ item }: { item: Item }) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="group relative w-[280px] h-[420px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] backdrop-blur transition-all duration-300 hover:translate-y-[-4px] hover:border-white/20 hover:shadow-2xl hover:shadow-[#AC7BFF]/10 flex flex-col">
      {/* Media container */}
      <div className="relative flex-1 w-full overflow-hidden bg-white/5">
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#AC7BFF]" />
          </div>
        )}
        
        <img
          src={item.src}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        

        {/* Prompt overlay on hover */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="w-full p-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#AC7BFF]">
              Prompt
            </div>
            <p className="line-clamp-4 text-sm leading-relaxed text-white/95">
              {item.prompt}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-[120px]">
        <div>
          <h3 className="font-semibold leading-tight text-white line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-white/60">{item.category}</p>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={() => setLiked((v) => !v)}
            className={`group/btn flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              liked
                ? "border-[#AC7BFF]/50 bg-[#AC7BFF]/20 text-[#AC7BFF]"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
            }`}
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              className="transition-transform duration-200 group-hover/btn:scale-110"
            >
              <path
                fill={liked ? "#AC7BFF" : "currentColor"}
                d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span>{(item.likes ?? 0) + (liked ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/** ------------------ Filtering ------------------ */

function filtered(all: Item[], opts: { cat: Category; model: Model; q: string }) {
  const { cat, model, q } = opts;
  const search = q.trim().toLowerCase();
  return all
    .filter((i) => i.category === cat)
    .filter((i) => (model === "All" ? true : i.model === model))
    .filter((i) =>
      !search
        ? true
        : [i.title, i.prompt, i.category, i.model].join(" ").toLowerCase().includes(search)
    );
}