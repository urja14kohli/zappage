"use client";

import { useMemo, useState } from "react";
import {
  HiHeart, HiChatBubbleOvalLeft, HiArrowUpRight, HiCursorArrowRays
} from "react-icons/hi2";
// import {
//   SiLinkedin, SiX, SiInstagram, SiYoutube
// } from "react-icons/si";

type Tone = "Founder" | "Hype" | "Calm";

export default function ImpactTrio() {
  const [tone, setTone] = useState<Tone>("Founder");
  const [note, setNote] = useState(
    "Big release this week. Here is why it matters and how to try it."
  );
  const preview = useMemo(() => toVoice(note, tone), [note, tone]);

  return (
    <section className="relative py-20">
      {/* content container */}
      <div className="mx-auto max-w-7xl px-6">

      <div className="text-center">
        <h2
          className="text-4xl font-semibold leading-tight md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Results <span className="text-[#AC7BFF]">creators</span> feel
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/70">
          Go viral, sound like you, and publish in a fraction of the time.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {/* 1) Go viral */}
        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,.4)] animate-float-1 hover:[animation-play-state:paused]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            {/* replace poster with your output shot */}
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop"
              alt="Zap output getting traction"
              className="h-full w-full object-cover"
            />
            {/* metrics overlay */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <Badge>2.4M views</Badge>
              <Badge>128k likes</Badge>
              <Badge>9.1k comments</Badge>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          </div>

          <h3 className="mt-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Go viral
          </h3>
          <p className="mt-1 text-white/75">
            Hooks, captions, and visuals that earn reach. See the exact prompt on hover in the gallery.
          </p>

          {/* tiny engagement bar */}
          <div className="mt-4 flex items-center gap-5 text-white/80">
            <span className="inline-flex items-center gap-1 text-sm"><HiHeart /> 128k</span>
            <span className="inline-flex items-center gap-1 text-sm"><HiChatBubbleOvalLeft /> 9.1k</span>
            <span className="inline-flex items-center gap-1 text-sm"><HiArrowUpRight /> Share</span>
          </div>
        </article>

        {/* 2) Sound like you (interactive) */}
        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,.4)] animate-float-2 hover:[animation-play-state:paused]">
          <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Sound like you
          </h3>

          <label className="mt-3 block text-xs text-white/60" htmlFor="voiceInput">Type a line</label>
          <textarea
            id="voiceInput"
            rows={3}
            className="mt-1 w-full resize-none rounded-xl border border-white/15 bg-white/5 p-3 text-[15px] outline-none placeholder:text-white/40 focus:ring-2 focus:ring-fuchsia-400/40"
            placeholder="Announce something in your style…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {(["Founder", "Hype", "Calm"] as Tone[]).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  tone === t ? "bg-white/15" : "border-white/15 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* dark social-style preview (no white pane) */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[.06] p-4 text-white shadow-[0_10px_40px_rgba(0,0,0,.35)]">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white border border-white/20 flex items-center justify-center">
                <img src="/zap logo Background Removed.png" alt="Sonetz" className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[14px] font-semibold">Sonetz Inc.</div>
                <div className="text-[12px] text-white/60">Social post</div>
              </div>
            </div>
            <p className="text-[15px] leading-[1.45]">{preview}</p>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-white/60">
              <span className="inline-flex items-center gap-1"><HiHeart /> 1.2k</span>
              <span className="inline-flex items-center gap-1"><HiChatBubbleOvalLeft /> 214</span>
            </div>
          </div>

        </article>

        {/* 3) 10x faster (scheduler mock) */}
        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,.4)] animate-float-3 hover:[animation-play-state:paused]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[.04]">
            {/* timeline lanes */}
            <SchedulerRow label="Mon" x={10} w={36} />
            <SchedulerRow label="Tue" x={30} w={48} />
            <SchedulerRow label="Wed" x={18} w={40} />
            <SchedulerRow label="Thu" x={55} w={30} />
            <SchedulerRow label="Fri" x={22} w={58} />
            <SchedulerRow label="Sat" x={12} w={42} />
            <SchedulerRow label="Sun" x={35} w={28} />

            {/* purple cursor */}
            <div className="pointer-events-none absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/25 px-3 py-1 text-xs text-fuchsia-200 ring-1 ring-fuchsia-400/40 backdrop-blur">
                <HiCursorArrowRays /> Schedule
              </span>
            </div>
          </div>

          <h3 className="mt-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            10x faster
          </h3>
          <p className="mt-1 text-white/75">
            Auto sizes. Smart times. One click to queue across channels while you keep making.
          </p>
        </article>
      </div>
      </div>

      {/* Floating animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-8px) rotate(0.5deg); }
            66% { transform: translateY(4px) rotate(-0.3deg); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(6px) rotate(-0.4deg); }
            66% { transform: translateY(-10px) rotate(0.6deg); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-6px) rotate(0.3deg); }
            66% { transform: translateY(8px) rotate(-0.5deg); }
          }
          .animate-float-1 { animation: float1 6s ease-in-out infinite; }
          .animate-float-2 { animation: float2 7s ease-in-out infinite 1s; }
          .animate-float-3 { animation: float3 8s ease-in-out infinite 2s; }

          @media (prefers-reduced-motion: reduce) {
            .animate-float-1, .animate-float-2, .animate-float-3 {
              animation: none !important;
            }
          }
        `
      }} />
    </section>
  );
}

/* --- tiny pieces --- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white/90 backdrop-blur w-fit">
      {children}
    </span>
  );
}

function SchedulerRow({ label, x, w }: { label: string; x: number; w: number }) {
  return (
    <div className="relative mx-5 mt-4">
      <div className="mb-1 text-[10px] uppercase tracking-wide text-white/50">{label}</div>
      <div className="h-2 rounded-full bg-white/7" />
      <div
        className="absolute top-[18px] h-6 rounded-full bg-gradient-to-r from-fuchsia-500/70 to-indigo-500/70 shadow-[0_8px_20px_rgba(120,80,255,.4)]"
        style={{ left: `${x}%`, width: `${w}%` }}
      />
    </div>
  );
}

function toVoice(text: string, tone: Tone) {
  const t = text.trim();
  if (!t) return "";
  if (tone === "Founder")
    return t + " Built from real user feedback. Try it and tell us what to improve.";
  if (tone === "Hype")
    return "🚀 " + t.replace(/\./g, "") + ". Faster, cleaner, louder. Tap in and show your feed. ⚡";
  return t + " Simple, helpful, and easy to use. Give it a try and share your thoughts.";
}