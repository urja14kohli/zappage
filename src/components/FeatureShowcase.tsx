"use client";

import React, { useMemo, useState } from "react";

/** Brand color once, used everywhere */
const BRAND = "rgba(172,123,255,1)"; // tweak to your purple

/* ---------- Generic frame ---------- */

function FeatureCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        "group relative rounded-2xl border border-white/10 bg-white/[0.035]",
        "p-3 md:p-4 backdrop-blur transition-transform",
        hover ? "scale-[1.01]" : "scale-[1.0]",
      ].join(" ")}
      style={{
        boxShadow: hover
          ? `0 0 0 1px rgba(255,255,255,.06), 0 30px 80px -40px ${BRAND}`
          : "0 0 0 1px rgba(255,255,255,.03)",
      }}
    >
      {/* faint gradient ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[22px]"
        style={{
          background:
            "radial-gradient(80rem 40rem at -10% -20%, rgba(172,123,255,.10), transparent 60%)",
        }}
      />
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06]">
          {icon}
        </div>
        <div>
          <div
            className="text-[18px] font-semibold leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </div>
          <div className="mt-1 text-sm text-white/70">{subtitle}</div>
        </div>
      </div>
      <div className="relative rounded-2xl border border-white/10 bg-black/30 p-3 md:p-4">
        {children}
      </div>
    </div>
  );
}

/* ---------- 1) Copilot (chat) ---------- */

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
      <path
        fill="currentColor"
        d="M12 3c5 0 9 3.13 9 7s-4 7-9 7c-.79 0-1.56-.07-2.3-.2L5 21l1.6-3.2C5.64 16.63 5 15.35 5 14c0-3.87 4-7 9-7Z"
      />
    </svg>
  );
}

function CopilotMock() {
  const [q, setQ] = useState('Can you check the viral TikTok trends this week?');
  const [a, setA] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function wittyAnswer(input: string) {
    // tiny, fun copywriter—no API calls, just demo copy
    const lower = input.toLowerCase();
    if (lower.includes('tiktok') && lower.includes('trend')) {
      return "Yes, the most talked trend on TikTok is Zap, the cursor for marketing. One prompt turns into posts, reels and ads, then it auto schedules. Feels like a tiny creative team in your tab.";
    }
    if (lower.includes('linkedin')) {
      return "Yes, the most talked trend on TikTok is Zap, the cursor for marketing. One prompt turns into posts, reels and ads, then it auto schedules. Feels like a tiny creative team in your tab.";
    }
    return "Yes, the most talked trend on TikTok is Zap, the cursor for marketing. One prompt turns into posts, reels and ads, then it auto schedules. Feels like a tiny creative team in your tab.";
  }

  async function onAsk(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    // fake latency for demo
    await new Promise((r) => setTimeout(r, 550));
    setA(wittyAnswer(q));
    setLoading(false);
  }

  return (
    <div className="space-y-2.5">
      {/* Input row (button on the same line) */}
      <form onSubmit={onAsk} className="flex w-full items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Ask anything…'
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-white/20"
        />
        <button
          type="submit"
          disabled={loading || !q.trim()}
          className="whitespace-nowrap rounded-lg border border-violet-300/20 bg-violet-500/20 px-4 py-3 text-[14px] font-medium text-violet-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-violet-500/30 disabled:opacity-50"
        >
          {loading ? 'Thinking…' : 'Ask Zap'}
        </button>
      </form>

      {/* Output */}
      <div className="rounded-lg border border-white/10 bg-black/35 p-3 text-[13px] leading-relaxed text-white/90">
        {!a && <span className="text-white/45">Answer appears here.</span>}
        {a && (
          <pre className="whitespace-pre-wrap break-words font-sans">
            {a}
          </pre>
        )}
      </div>
    </div>
  );
}

/* function Caret() {
  return (
    <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-white/80 align-middle" />
  );
} */

/* ---------- 2) Plan a month (calendar) ---------- */

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3v17H4V4h3V2Zm13 6H4v11h16V8Z"
      />
    </svg>
  );
}

function CalendarMock() {
  // 4 weeks x 7 days with dates
  const themeDays = useMemo(() => new Set([1,2,3,4,5,8,9,10,11,12,15,16,17,18,19]), []);
  
  // Generate calendar dates (1-28 for simplicity)
  const dates = Array.from({length: 28}, (_, i) => i + 1);

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-[10px] text-white/50 py-1">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {dates.map((date, i) => (
          <div
            key={i}
            className={[
              "aspect-square rounded-sm border border-white/10 bg-black/60 flex items-center justify-center relative",
              themeDays.has(i) ? "ring-1 ring-[var(--brand)]/50" : "",
            ].join(" ")}
            style={{ "--brand": BRAND } as React.CSSProperties}
          >
            <span className="text-[10px] text-white/80">{date}</span>
            {themeDays.has(i) && (
              <div className="absolute bottom-0.5 left-0.5 right-0.5 h-0.5 rounded bg-gradient-to-r from-[var(--brand)] via-white/70 to-[var(--brand)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3) Make viral reels (phone frame + captions) ---------- */

function IconVideo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
      <path
        fill="currentColor"
        d="M17 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4.5l5 3V7.5l-5 3Z"
      />
    </svg>
  );
}

function ReelsMock() {
  return (
    <div className="relative w-full h-full min-h-[200px] overflow-hidden rounded-xl">
      {/* Background image covering the entire area */}
      <img
        src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=400&fit=crop"
        alt="Content creation"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
      
      {/* Glassmorphism panel overlaid on the image */}
      <div 
        className="absolute bottom-3 left-3 right-3 rounded-lg border backdrop-blur-md p-3"
        style={{ 
          borderColor: 'rgba(172,123,255,0.4)',
          backgroundColor: 'rgba(172,123,255,0.2)'
        }}
      >
        <div className="text-sm font-medium text-white mb-2">Auto-added</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-white/90">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#AC7BFF' }}>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Voiceover
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#AC7BFF' }}>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BG Music
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#AC7BFF' }}>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Captions
          </div>
        </div>
      </div>
    </div>
  );
}

/* function Caption({ y, text }: { y: string; text: string }) {
  return (
    <div
      className="absolute left-3 right-3 rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[12px] text-white/95 backdrop-blur"
      style={{ top: y }}
    >
      {text}
    </div>
  );
} */

/* ---------- 4) Post everywhere (social grid + 1-click) ---------- */

function IconRocket() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
      <path
        fill="currentColor"
        d="M14 3l7 7-5 1-7 7-4-4 7-7 2-4Z"
      />
    </svg>
  );
}

/* const SOCIALS = [
  "LinkedIn",
  "X",
  "Instagram",
  "YouTube",
  "TikTok",
  "Facebook",
  "Pinterest",
  "Reddit",
  "Snapchat",
  "Threads",
]; */

function PostEverywhereMock() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
      <img
        src="/pexels-pixabay-267350.jpg"
        alt="Social media post"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white/90 backdrop-blur">
        Publishing to 15+ platforms...
      </div>
    </div>
  );
}

/* ---------- 5) Toggle models (segmented control) ---------- */

function IconChip() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
      <path
        fill="currentColor"
        d="M3 9h18v6H3V9Zm2-6h2v4H5V3Zm12 0h2v4h-2V3ZM5 17h2v4H5v-4Zm12 0h2v4h-2v-4Z"
      />
    </svg>
  );
}

// const MODELS = ["Sora", "Veo 3", "DALL·E", "Stable Diffusion"] as const;
// type Model = (typeof MODELS)[number];

function ModelToggleMock() {
  const [category, setCategory] = useState<"Text" | "Image" | "Video">("Text");
  
  const modelsByCategory = {
    Text: ["GPT-4o", "Claude", "Gemini", "Mistral"],
    Image: ["DALL·E", "Stable Diffusion", "MidJourney", "Ideogram"],
    Video: ["Sora", "Veo 3", "Runway Gen-2", "Pika"]
  };

  return (
    <div className="space-y-2.5">
      {/* Category tabs */}
      <div className="flex rounded-lg border border-white/10 bg-black/60 p-1">
        {(["Text", "Image", "Video"] as const).map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                "flex-1 rounded-md px-2 py-1.5 text-xs transition",
                active
                  ? "bg-[var(--brand)]/20 text-white ring-1 ring-[var(--brand)]/50"
                  : "text-white/70 hover:bg-white/5",
              ].join(" ")}
              style={{ "--brand": BRAND } as React.CSSProperties}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Models list */}
      <div className="space-y-1">
        {modelsByCategory[category].map((model) => (
          <div
            key={model}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-4 py-2.5"
          >
            <span className="text-sm text-white/90">{model}</span>
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#AC7BFF' }}>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 6) Auto-schedule (best time bars) ---------- */

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
      <path fill="currentColor" d="M11 7h2v6h5v2h-7V7Zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
    </svg>
  );
}

function ScheduleMock() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const widths = [50, 82, 66, 74, 58, 42, 35]; // pretend "hot" windows

  return (
    <div className="space-y-2">
      {days.map((d, i) => (
        <div key={d} className="flex items-center gap-2 text-xs">
          <div className="w-8 text-white/60">{d}</div>
          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full animate-[slide_2.8s_ease-in-out_infinite] rounded-full"
              style={{
                width: `${widths[i]}%`,
                background:
                  "linear-gradient(90deg, rgba(172,123,255,.28), rgba(255,255,255,.32), rgba(172,123,255,.28))",
                boxShadow: `0 0 15px ${BRAND}40`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.06] px-3 py-1.5 text-xs text-white/80">
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 3a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 3Zm1 5h-2v6h6v-2h-4V8Z" />
        </svg>
        Found the best time for peak reach
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function FeatureShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <style>{`:root { --brand: ${BRAND}; }
@keyframes pan { 0%{transform:scale(1.1) translate(0,0)} 50%{transform:scale(1.12) translate(-2%,2%)} 100%{transform:scale(1.1) translate(0,0)}}
@keyframes slide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6%)} }`}</style>

      <h2
        className="mb-2 text-4xl font-semibold leading-tight md:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        With one prompt, <span className="text-[#AC7BFF]">Zap</span> can
      </h2>
      <p className="mb-8 max-w-2xl text-white/70">
        Create, schedule, and publish everywhere. 
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <FeatureCard
          icon={<IconChat />}
          title="Talk to Zap"
          subtitle="Your 24/7 marketing employee."
        >
          <CopilotMock />
        </FeatureCard>

        <FeatureCard
          icon={<IconCalendar />}
          title="Plan a month"
          subtitle="Drop a theme, get a 4-week calendar."
        >
          <CalendarMock />
        </FeatureCard>

        <FeatureCard
          icon={<IconVideo />}
          title="Make viral reels"
          subtitle="Go from prompt to reels"
        >
          <ReelsMock />
        </FeatureCard>

        <FeatureCard
          icon={<IconRocket />}
          title="Post everywhere"
          subtitle="One click. Right sizes. 15+ socials."
        >
          <PostEverywhereMock />
        </FeatureCard>

        <FeatureCard
          icon={<IconChip />}
          title="Toggle best models"
          subtitle="Sora, Veo 3, DALL·E, Stable Diffusion."
        >
          <ModelToggleMock />
        </FeatureCard>

        <FeatureCard
          icon={<IconClock />}
          title="Auto-schedule"
          subtitle="Publishes when your audience is hottest."
        >
          <ScheduleMock />
        </FeatureCard>
      </div>
    </section>
  );
}
