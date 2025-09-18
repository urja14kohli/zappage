"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

type Item = {
  id: string;
  title: string;
  src: string;           // poster/image
  prompt: string;
  aspect?: "portrait" | "landscape" | "square";
  isVideo?: boolean;
  badge?: string;        // Sora, Veo 3, DALL·E, etc
};

type Props = {
  items: Item[];         // pass your best 5–9
  radius?: number;       // curve depth (px)
  spread?: number;       // total angle spread (deg)
  cardW?: number;        // px (desktop)
  cardH?: number;        // px (desktop)
};

export default function CorridorHero({
  items,
  radius = 720,   // was 820
  spread = 50,    // was 70
  cardW = 320,    // was 340
  cardH = 440,    // was 480
}: Props) {
  const [center, setCenter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // keep center in range
  useEffect(() => {
    if (center < 0) setCenter(0);
    if (center > items.length - 1) setCenter(items.length - 1);
  }, [center, items.length]);

  // wheel pans
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      setCenter((c) => {
        const next = c + (e.deltaY > 0 ? 1 : -1);
        return Math.max(0, Math.min(items.length - 1, next));
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [items.length]);

  const panels = useMemo(() => {
    // choose up to 7 around the center
    const windowSize = Math.min(7, items.length);
    const half = Math.floor(windowSize / 2);
    const start = Math.max(0, Math.min(items.length - windowSize, center - half));
    const slice = items.slice(start, start + windowSize);

    // compute transforms across -spread..+spread
    return slice.map((it, i) => {
      const idx = i - Math.floor(slice.length / 2);
      const angle = (idx / (slice.length === 1 ? 1 : (slice.length - 1) / 2)) * (spread / 2);
      const translateX = idx * (cardW * 0.22); // subtle lateral spacing
      const transform = `translateX(${translateX}px) rotateY(${angle}deg) translateZ(${radius}px)`;
      return { it, i, transform, angle };
    });
  }, [items, center, spread, radius, cardW]);

  return (
    <section className="mx-auto max-w-7xl px-6">
      {/* Heading */}
      <div className="mb-8">
        <h1
          className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Explore
        </h1>
  
      </div>

      {/* Corridor */}
      <div
        ref={containerRef}
        className="relative hidden h-[400px] select-none md:block overflow-hidden rounded-[28px] mt-4 md:mt-8"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* subtle top/bottom fade so cards don't clash with heading */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: [
              "radial-gradient(90rem 50rem at 10% -10%, rgba(172,123,255,.12), transparent 60%)",
              "radial-gradient(80rem 50rem at 90% 10%, rgba(120,80,255,.12), transparent 60%)",
            ].join(", "),
            // soft vignette; top fade prevents collision with the H1
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />

        {/* Floor reflection effect */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-30"
          style={{
            background: "linear-gradient(to top, rgba(172,123,255,0.1), transparent)",
          }}
        />

        {/* 3D stage (lowered from 50% to 58%) */}
        <div
          className="absolute left-1/2 top-[58%] w-[1px] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {panels.map(({ it, transform, angle }) => (
            <figure
              key={it.id}
              className="group absolute origin-center overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] shadow-2xl backdrop-blur"
              style={{
                width: cardW * 0.85,     // smaller cards
                height: cardH * 0.85,
                transform,
                // keep the card with smallest angle visually on top
                zIndex: 1000 - Math.abs(Math.round(angle * 100)),
                transition: "transform 600ms cubic-bezier(.22,.61,.36,1)",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `${transform} translateZ(40px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = transform;
              }}
            >
                {/* Image container with loading state */}
                <div className="relative h-full w-full overflow-hidden bg-white/5">
                  <img
                    src={it.src}
                    alt={it.title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  
                  {/* Premium overlay gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* model / video badges */}
                <div className="absolute right-3 top-3 grid grid-flow-col gap-2">
                  {it.badge && (
                    <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs text-white/85 backdrop-blur">
                      {it.badge}
                    </span>
                  )}
                  {it.isVideo && (
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur">
                      ▶
                    </span>
                  )}
                </div>

                {/* prompt overlay */}
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100">
                  <div className="w-full p-3">
                    <div className="mb-2 text-[10px] uppercase tracking-wide text-white/60">Prompt</div>
                    <p className="line-clamp-3 text-sm text-white/95">{it.prompt}</p>
                  </div>
                </figcaption>

              </figure>
            ))}
        </div>

        {/* controls */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
          <button
            onClick={() => setCenter((c) => Math.max(0, c - 1))}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setCenter((c) => Math.min(items.length - 1, c + 1))}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Premium mobile fallback */}
      <div className="md:hidden">
        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => (
            <article
              key={it.id}
              className="group relative w-[280px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-xl"
            >
              <div className="relative h-[380px] overflow-hidden">
                <img 
                  src={it.src} 
                  alt={it.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Mobile badges */}
                <div className="absolute right-3 top-3 flex gap-2">
                  {it.badge && (
                    <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white/85 backdrop-blur">
                      {it.badge}
                    </span>
                  )}
                  {it.isVideo && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {it.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-white/70">
                  {it.prompt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
