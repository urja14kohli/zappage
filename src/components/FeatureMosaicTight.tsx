"use client";

import React from "react";

/* ---- Tiny icon set (no emojis) ---- */
const Ic = {
  calendar: (c="") => <svg className={c} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  paper: (c="") => <svg className={c} viewBox="0 0 24 24" fill="none">
    <path d="M3 11.5l18-8-7.5 18-2.5-6-6-2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>,
  mic: (c="") => <svg className={c} viewBox="0 0 24 24" fill="none">
    <rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 11v1a7 7 0 0 0 14 0v-1M12 22v-3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  brain: (c="") => <svg className={c} viewBox="0 0 24 24" fill="none">
    <path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3v1a4 4 0 0 0 4 4h2V6a3 3 0 0 0 0-3zM15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3v1a4 4 0 0 1-4 4h-2V6a3 3 0 0 1 0-3z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  wand: (c="") => <svg className={c} viewBox="0 0 24 24" fill="none">
    <path d="M4 20l8-8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 3l1.5 3L20 7l-3 1.5L15.5 12 14 8.5 11 7l3-1.5L15 3z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  clock: (c="") => <svg className={c} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
};

/* ---- Data ---- */
type Size = "sm" | "md" | "lg";
type Kind = "image" | "text" | "stat";

type Tile = {
  id: string;
  kind: Kind;
  size: Size;
  title: string;
  note?: string;
  icon?: keyof typeof Ic;
  img?: string; // public path for image tiles
};

const TILES: Tile[] = [
  { id:"reels", kind:"image", size:"lg", title:"Make viral reels", note:"One clip → 5 hooks. Auto captions.", img:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop" },
  { id:"ad",    kind:"image", size:"md", title:"Spin ad creatives", note:"Product shots + headlines + CTAs.", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
  { id:"ref",   kind:"image", size:"md", title:"Reference match", note:"'Make it like this' — colors, fonts, vibe.", img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },

  { id:"plan",  kind:"text",  size:"md", title:"Plan a month", note:"Drop a theme, get a 4-week calendar.", icon:"calendar" },
  { id:"post",  kind:"text",  size:"md", title:"Post everywhere", note:"One click. Right sizes. 15+ socials.", icon:"paper" },
  { id:"brand", kind:"text",  size:"sm", title:"Stay on-brand", note:"Paste 2 samples; Zap locks your voice.", icon:"mic" },
  { id:"models",kind:"text",  size:"sm", title:"Toggle best models", note:"Sora · Veo 3 · DALL·E · Stable Diffusion.", icon:"brain" },
  { id:"copilot",kind:"text", size:"sm", title:"Talk to Copilot", note:"Ask, tweak, remix, ship.", icon:"wand" },
  { id:"remix", kind:"text",  size:"sm", title:"Remix any idea", note:"10 formats — posts, carousels, reels, thumbs.", icon:"wand" },
  { id:"auto",  kind:"text",  size:"sm", title:"Auto-schedule", note:"Publishes when your audience is hottest.", icon:"clock" },

  { id:"s1", kind:"stat", size:"sm", title:"221k+", note:"assets shipped in beta" },
  { id:"s2", kind:"stat", size:"sm", title:"97%",   note:"save hours weekly" },
  { id:"s3", kind:"stat", size:"sm", title:"14+",   note:"channels, one click" },
];

/* ---- Dense grid math (no holes) ----
   We use tiny fixed row units (10px). Each tile spans N rows.
*/
// const ROW_UNIT = 10; // px
const spanFor: Record<Size, number> = { sm: 20, md: 30, lg: 44 }; // 200 / 300 / 440 px

function Shell({ children, className="" }: React.PropsWithChildren<{className?:string}>) {
  return (
    <div
      className={[
        "relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[.045] backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-transform duration-300",
        "hover:-translate-y-[2px]",
        className,
      ].join(" ")}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-px bg-[radial-gradient(60rem_20rem_at_-20%_-20%,rgba(168,130,255,.08),transparent_40%),radial-gradient(40rem_16rem_at_120%_120%,rgba(120,80,255,.08),transparent_35%)]" />
      {children}
    </div>
  );
}

function ImageCard({ t }: { t: Tile }) {
  return (
    <Shell>
      <div className="absolute inset-0">
        <img src={t.img!} alt={t.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      </div>
      <div className="relative z-10 mt-auto p-4">
        <h3 className="text-base font-semibold">{t.title}</h3>
        <p className="mt-1 text-xs text-white/80">{t.note}</p>
      </div>
    </Shell>
  );
}

function TextCard({ t }: { t: Tile }) {
  const Icon = t.icon ? Ic[t.icon] : undefined;
  return (
    <Shell className="p-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
            {Icon("h-4 w-4")}
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold">{t.title}</h3>
          <p className="mt-1 text-xs text-white/80">{t.note}</p>
        </div>
      </div>
    </Shell>
  );
}

function StatCard({ t }: { t: Tile }) {
  return (
    <Shell className="p-4">
      <div className="flex h-full flex-col justify-between">
        <div className="text-3xl font-semibold tracking-tight">{t.title}</div>
        <div className="text-xs text-white/70">{t.note}</div>
      </div>
    </Shell>
  );
}

export default function FeatureMosaicTight() {
  // Sort bigger first; dense flow fills remaining with smaller ones
  const sizeWeight = { lg: 3, md: 2, sm: 1 };
  const items = [...TILES].sort((a,b) => sizeWeight[b.size] - sizeWeight[a.size]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 text-white">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={{fontFamily:"var(--font-display)"}}>
        With one prompt, Zap can…
      </h2>
      <p className="mt-2 max-w-2xl text-white/75">Create, schedule, and publish everywhere.</p>

      <div
        className={[
          "mt-6 grid gap-3 md:gap-4",
          "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12",
          "auto-rows-[10px]", // << key bit - tiny row units for perfect packing
        ].join(" ")}
        style={{ gridAutoFlow: 'dense' }} // << dense packing to eliminate holes
      >
        {items.map((t) => {
          const rows = spanFor[t.size];
          const style = { gridRowEnd: `span ${rows}` }; // N * 10px high
          // column spans (smaller on phones, wider on desktop)
          const col =
            t.size === "lg"
              ? "col-span-2 sm:col-span-4 lg:col-span-6 xl:col-span-6"
              : t.size === "md"
              ? "col-span-2 sm:col-span-4 lg:col-span-4 xl:col-span-4"
              : "col-span-2 sm:col-span-2 lg:col-span-3 xl:col-span-3";

          return (
            <div key={t.id} className={col} style={style}>
              {t.kind === "image" && <ImageCard t={t} />}
              {t.kind === "text"  && <TextCard  t={t} />}
              {t.kind === "stat"  && <StatCard  t={t} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

