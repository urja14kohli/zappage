"use client";

import { useRef, useState } from "react";

type Media = {
  id: string;
  type: "image" | "video";
  src: string;        // image OR video src
  poster?: string;    // optional poster for videos
  aspect?: "portrait" | "square" | "landscape";
};

const ITEMS: Media[] = [
  { id: "sneaker", type: "image", src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop", aspect: "portrait" },
  { id: "watch", type: "image", src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop", poster: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop", aspect: "landscape" },
  { id: "flatlay", type: "image", src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", aspect: "square" },
  { id: "founder", type: "image", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", aspect: "portrait" },
  { id: "fitness", type: "image", src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop", poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop", aspect: "portrait" },
  { id: "carousel", type: "image", src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop", aspect: "landscape" },
  { id: "reel", type: "image", src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop", poster: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop", aspect: "portrait" },
  { id: "workspace", type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop", aspect: "square" },
  { id: "product", type: "image", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop", aspect: "square" },
];

const aspectClass = (a?: Media["aspect"]) => {
  switch (a) {
    case "portrait":
      return "aspect-[9/16]";
    case "landscape":
      return "aspect-[16/9]";
    case "square":
    default:
      return "aspect-square";
  }
};

export default function ExploreStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    const node = stripRef.current;
    if (!node) return;
    const by = Math.round(node.clientWidth * 0.8);
    node.scrollBy({ left: dir === "left" ? -by : by, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <h2
        className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Explore
      </h2>

      {/* Pane */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#181326] via-[#140F20] to-[#0B0911] shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)]">
        {/* edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0B0911] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0B0911] to-transparent z-10" />

        {/* nav buttons */}
        <button
          onClick={() => scroll("left")}
          className="group absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-white/80 backdrop-blur transition hover:bg-white/20 hover:scale-110"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="m15.4 7.4-1.4-1.4L7 13l7 7 1.4-1.4L9.8 13z" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="group absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-white/80 backdrop-blur transition hover:bg-white/20 hover:scale-110"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="m8.6 16.6 1.4 1.4L17 11l-7-7-1.4 1.4L14.2 11z" />
          </svg>
        </button>

        {/* the filmstrip */}
        <div
          ref={stripRef}
          className="group strip-scroll flex gap-4 overflow-x-auto px-16 py-10 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((m, i) => (
            <Card
              key={m.id}
              media={m}
              active={active === i}
              dim={active !== null && active !== i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>

      {/* Description */}

    </section>
  );
}

function Card({
  media,
  active,
  dim,
  onEnter,
  onLeave,
}: {
  media: Media;
  active: boolean;
  dim: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  // sizes tuned for pane; cards never spill outside
  const baseWidth =
    media.aspect === "portrait" ? "w-[210px] md:w-[240px]" :
    media.aspect === "landscape" ? "w-[360px] md:w-[420px]" :
    "w-[240px] md:w-[280px]";

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={[
        "relative shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
        baseWidth,
        aspectClass(media.aspect),
        active ? "z-[2] scale-[1.06] shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/20"
               : dim ? "scale-[.96] opacity-70"
                     : "scale-[.98]",
      ].join(" ")}
    >
      {/* media */}
      {media.type === "image" ? (
        <img
          src={media.src}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          draggable={false}
        />
      ) : (
        <HoverVideo src={media.src} poster={media.poster} />
      )}

      {/* subtle inner gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}

function HoverVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
      onMouseLeave={(e) => e.currentTarget.pause()}
    />
  );
}
