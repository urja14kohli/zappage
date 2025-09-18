"use client";

import { useMemo, useState } from "react";
import {
  SiX, SiLinkedin, SiInstagram, SiYoutube, SiPinterest, SiReddit, /* SiTiktok, */
} from "react-icons/si";

type Tone = "Founder" | "Hype" | "Calm";

export default function TeamsShowcase() {
  // ----- Brand Voice Playground (center card) -----
  const [input, setInput] = useState(
    "Big release this week. Here's why it matters and how to try it."
  );
  const [tone, setTone] = useState<Tone>("Founder");

  const preview = useMemo(() => stylize(input, tone), [input, tone]);

  return (
    <section className="relative py-20">
      {/* background spark - full width */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(60rem 40rem at 15% -10%, rgba(170,115,255,.22), transparent 55%)",
            "radial-gradient(46rem 36rem at 85% -10%, rgba(120,80,255,.22), transparent 60%)",
            "radial-gradient(100rem 70rem at 50% 120%, rgba(20,14,33,.96), rgba(9,7,12,1))",
          ].join(", "),
        }}
      />

      {/* content container */}
      <div className="mx-auto max-w-7xl px-6">

      {/* Top headline */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-semibold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          Scale your creative output without scaling overhead
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/70">
          Make, preview, and ship as a team. Zap keeps your voice, automates the busywork,
          and posts to every channel.
        </p>
      </div>

      {/* Three visual cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* CARD 1 — Brand templates (visual-first) */}
        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_20px_80px_rgba(0,0,0,.5)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
              alt="Brand video template"
              className="h-full w-full object-cover"
            />
            {/* overlay mini-UI */}
            <div className="absolute left-6 top-6 w-[56%] rounded-xl border border-white/15 bg-black/60 p-3 text-[12px] text-white/85">
              <div className="mb-2 font-medium opacity-90">Graphic overlay</div>
              {[
                "Choose file", "Text overlay", "Logo.png", "Background.png",
              ].map((label) => (
                <div
                  key={label}
                  className="mb-2 flex items-center justify-between rounded-lg border border-white/15 bg-white/[.06] px-3 py-2"
                >
                  <span>{label}</span>
                  <span className="rounded-md bg-white/10 px-2 py-[2px] text-[11px]">Edit</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          </div>
          <h3 className="mt-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Brand templates
          </h3>
          <p className="mt-1 text-white/75">
            On-brand styles for text, color, logo, intro and outro. Save once, reuse forever.
          </p>
        </article>

        {/* CARD 2 — Keep your voice (interactive) */}
        <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur">
          <h3 className="mb-3 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Keep your voice
          </h3>

          {/* Input + tone pills */}
          <label htmlFor="voiceInput" className="text-xs text-white/60">Type a line</label>
          <textarea
            id="voiceInput"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-1 w-full resize-none rounded-xl border border-white/15 bg-white/5 p-3 text-[15px] outline-none placeholder:text-white/40 focus:ring-2 focus:ring-fuchsia-400/40"
            placeholder="Announce v2 in your style…"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {(["Founder", "Hype", "Calm"] as Tone[]).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-full border px-3 py-1 text-sm transition-all duration-200 ${
                  tone === t ? "bg-white/15 border-white/30" : "border-white/15 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* LinkedIn-style preview */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white p-4 text-black shadow-[0_8px_40px_rgba(0,0,0,.25)]">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
              <div>
                <div className="text-[14px] font-semibold">Your Brand</div>
                <div className="text-[12px] text-black/60">· LinkedIn preview</div>
              </div>
            </div>
            <p className="text-[15px] leading-[1.45]">{preview}</p>
            <div className="mt-3 flex items-center gap-4 text-[12px] text-black/55">
              <span>👍 1.2k</span><span>💬 214</span><span>↗ Share</span>
            </div>
          </div>

          <p className="mt-3 text-[13px] text-white/70">
            Paste two samples in Zap to train your tone. Every caption and script stays consistent.
          </p>
        </article>

        {/* CARD 3 — Workflow integration (visual ring) */}
        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur">
          <div className="relative aspect-[4/3] w-full">
            {/* center node */}
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur">
              <div className="rounded-full bg-white/15 px-3 py-1 text-xs">Zap API</div>
            </div>
            {/* orbiting icons */}
            <IconDot className="orbit" style={{ transform: "translate(-50%, -50%) rotate(0deg) translateX(135px)" }}>
              <SiLinkedin />
            </IconDot>
            <IconDot className="orbit" style={{ transform: "translate(-50%, -50%) rotate(60deg) translateX(135px)" }}>
              <SiX />
            </IconDot>
            <IconDot className="orbit" style={{ transform: "translate(-50%, -50%) rotate(120deg) translateX(135px)" }}>
              <SiInstagram />
            </IconDot>
            <IconDot className="orbit" style={{ transform: "translate(-50%, -50%) rotate(180deg) translateX(135px)" }}>
              <SiYoutube />
            </IconDot>
            <IconDot className="orbit" style={{ transform: "translate(-50%, -50%) rotate(240deg) translateX(135px)" }}>
              <SiPinterest />
            </IconDot>
            <IconDot className="orbit" style={{ transform: "translate(-50%, -50%) rotate(300deg) translateX(135px)" }}>
              <SiReddit />
            </IconDot>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>

          <h3 className="mt-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Workflow integration
          </h3>
          <p className="mt-1 text-white/75">
            Connect your stack or use the API. One click to X, LinkedIn, Instagram, YouTube, and more.
          </p>
        </article>
      </div>

      {/* tiny styles for orbit animation */}
      <style jsx>{`
        .orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          animation: spin 18s linear infinite;
          transform-origin: center;
        }
        @keyframes spin { from { rotate: 0deg; } to { rotate: 360deg; } }
      `}</style>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
function IconDot({ children, className = "", style }: { 
  children: React.ReactNode; 
  className?: string; 
  style?: React.CSSProperties; 
}) {
  return (
    <div
      className={`grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white/90 backdrop-blur ${className}`}
      style={style}
      aria-hidden
    >
      <div className="text-lg opacity-90">{children}</div>
    </div>
  );
}

function stylize(text: string, tone: Tone) {
  const base = text.trim().replace(/\s+/g, " ");
  if (!base) return "";
  if (tone === "Founder") {
    return (
      base +
      " Built from real user feedback. Try it today and tell us what to improve."
    );
  }
  if (tone === "Hype") {
    return (
      "🚀 " +
      base.replace(/\./g, " —") +
      " Faster. Cleaner. Louder. Tap in and show your feed. ⚡"
    );
  }
  // Calm
  return (
    base +
    " It's simple, helpful, and easy to use. Give it a try and share your thoughts."
  );
}
