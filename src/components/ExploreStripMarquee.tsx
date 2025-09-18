"use client";

import { useState } from "react";

type Media = { id: string; src: string; aspect?: "portrait" | "square" | "landscape"; likes?: number };

const ITEMS: Media[] = [
  { id: "sneaker",   src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop",        aspect: "portrait",  likes: 312 },
  { id: "watches",   src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop",        aspect: "landscape", likes: 458 },
  { id: "skin",      src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",        aspect: "square",    likes: 201 },
  { id: "desert",    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",          aspect: "landscape", likes: 91 },
  { id: "founder",   src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",      aspect: "portrait",  likes: 377 },
  { id: "fitness",   src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",   aspect: "portrait",  likes: 245 },
  { id: "carousel",  src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=500&fit=crop",  aspect: "landscape", likes: 118 },
  { id: "workspace", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop", aspect: "square", likes: 189 },
  { id: "product",   src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop", aspect: "square", likes: 156 },
];

// tile widths tuned for a bold, full-height look
const widthFor = (a?: Media["aspect"]) =>
  a === "portrait"  ? "w-[260px] md:w-[300px]" :
  a === "landscape" ? "w-[480px] md:w-[560px]" :
                      "w-[320px] md:w-[380px]";

export default function ExploreStripMarquee() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <h2
        className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Explore
      </h2>

      {/* Pane (no gaps inside, full bleed) */}
      <div className="group relative h-[280px] md:h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0911]">
        {/* optional edge fades to keep it classy */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0B0911] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0B0911] to-transparent z-10" />

        {/* Track: duplicate content for seamless loop */}
        <div className="absolute inset-0">
          <div className="flex h-full animate-marquee [animation-play-state:running] group-hover:[animation-play-state:paused]">
            <Strip />
            <Strip aria-hidden />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
      Create content that’s a vibe
       
      </p>
    </section>
  );
}

function Strip(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex h-full">
      {ITEMS.map((m) => (
        <MediaCard
          key={m.id + (props["aria-hidden"] ? "-dup" : "")}
          media={m}
        />
      ))}
    </div>
  );
}

function MediaCard({ media }: { media: Media }) {
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <figure
      className={[
        "relative h-full shrink-0 select-none overflow-visible cursor-pointer", // overflow-visible for zoom effect
        widthFor(media.aspect),
      ].join(" ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div
        className={[
          "relative h-full w-full overflow-hidden transition-all duration-500 ease-out",
          isHovered 
            ? "scale-110 shadow-2xl shadow-black/50 rounded-2xl z-50" 
            : "scale-100 rounded-none"
        ].join(" ")}
      >
        <img
          src={media.src}
          alt=""
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out"
        />
        
        {/* Enhanced gradient overlay on hover */}
        <div className={[
          "absolute inset-0 transition-opacity duration-300",
          isHovered 
            ? "bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100"
            : "bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100"
        ].join(" ")} />

        {/* Like button - appears on hover */}
        <div className={[
          "absolute bottom-4 right-4 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        ].join(" ")}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className={[
              "flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium backdrop-blur transition-all duration-200",
              liked
                ? "border-[#AC7BFF]/50 bg-[#AC7BFF]/20 text-[#AC7BFF] shadow-lg shadow-[#AC7BFF]/20"
                : "border-white/30 bg-black/60 text-white hover:bg-black/80 shadow-lg shadow-black/30"
            ].join(" ")}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              className="transition-transform duration-200 hover:scale-110"
            >
              <path
                fill={liked ? "#AC7BFF" : "currentColor"}
                d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span>{(media.likes ?? 0) + (liked ? 1 : 0)}</span>
          </button>
        </div>

      </div>
    </figure>
  );
}