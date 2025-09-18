"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

type Kind = "post" | "image" | "video";
export type ShowcaseItem = {
  id: string; kind: Kind; title: string; kicker?: string;
  prompt: string; poster: string; src?: string; likes?: number;
};

export function ShowcaseStrip({ items }: { items: ShowcaseItem[] }) {
  const railRef = useRef<HTMLDivElement | null>(null);

  // gentle auto-scroll on touch devices
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || window.matchMedia("(pointer:fine)").matches) return;
    let raf = 0;
    const tick = () => { 
      rail.scrollLeft += 0.7; 
      if (rail.scrollLeft >= rail.scrollWidth / 2) rail.scrollLeft = 0; 
      raf = requestAnimationFrame(tick); 
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const LOOP = [...items, ...items];

  return (
    <div ref={railRef} className="group relative overflow-hidden"
         style={{maskImage:"linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                 WebkitMaskImage:"linear-gradient(to right, transparent, black 6%, black 94%, transparent)"}}>
      <div className="flex gap-6 pr-6 will-change-transform animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] [width:200%] [min-width:200%]">
        {LOOP.map((it, i) => <Card key={it.id + '_' + i} item={it} />)}
      </div>
    </div>
  );
}

function Card({ item }: { item: ShowcaseItem }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes ?? Math.floor(120 + Math.random() * 700));
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="group/card relative w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[.06] shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur">
      <div className="relative h-[380px]">
        {item.src ? (
          <video ref={videoRef} className="h-full w-full object-cover" playsInline muted loop preload="none"
                 poster={item.poster} src={item.src}
                 onMouseEnter={() => videoRef.current?.play().catch(() => {})}
                 onMouseLeave={() => videoRef.current?.pause()} />
        ) : (
          <Image className="h-full w-full object-cover" src={item.poster} alt={item.title} fill />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        <div className="absolute left-4 right-4 top-4">
          {item.kicker && <div className="mb-1 inline-block rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-black">{item.kicker}</div>}
          <h3 className="text-xl font-semibold drop-shadow" style={{fontFamily:"var(--font-display)"}}>{item.title}</h3>
        </div>

        {/* like + badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <button aria-label="Like" onClick={() => { setLiked(v => !v); setLikes(n => liked ? n - 1 : n + 1); }}
                  className={`rounded-full px-2 py-1 text-xs backdrop-blur ${liked ? "bg-pink-500 text-white" : "bg-black/60 text-white"}`}>
            ❤ {likes.toLocaleString()}
          </button>
          <span className="rounded bg-black/60 px-2 py-1 text-[10px]">Made with Zap</span>
        </div>

        {/* prompt only on hover/tap (no buttons) */}
        <div className="absolute inset-0 hidden items-end bg-black/45 p-3 text-left text-white group-hover/card:flex">
          <div className="w-full">
            <div className="text-xs opacity-90">Prompt</div>
            <div className="mt-1 line-clamp-3 text-sm italic">&ldquo;{item.prompt}&rdquo;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
