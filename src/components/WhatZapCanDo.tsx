"use client";

import Image from "next/image";

const items = [
  {
    key: "copilot",
    title: "Talk to Zap",
    body: "Ask, tweak, remix, and ship. Your copilot for content.",
    art: "/features/copilot-input.png",
  },
  {
    key: "plan",
    title: "Plan a month",
    body: "Drop a theme, get a 4-week calendar.",
    art: "/features/calendar-grid.png",
  },
  {
    key: "reels",
    title: "Make viral reels",
    body: "One clip becomes 5 hooks. Captions and VO ready.",
    art: "/features/reels-stack.png",
  },
  {
    key: "post",
    title: "Post everywhere",
    body: "One click. Right sizes. 15+ socials.",
    art: "/features/social-sizes.png",
  },
  {
    key: "models",
    title: "Toggle best models",
    body: "Sora, Veo 3, DALL·E, Stable Diffusion.",
    art: "/features/model-toggle.png",
  },
  {
    key: "schedule",
    title: "Auto-schedule",
    body: "Publishes when your audience is hottest.",
    art: "/features/best-times.png",
  },
];

export default function WhatZapCanDo() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-14 text-white">
      {/* soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(60rem 40rem at 5% 0%, rgba(172,123,255,.12), transparent 55%),
            radial-gradient(50rem 32rem at 90% 10%, rgba(120,80,255,.10), transparent 60%)
          `,
        }}
      />

      <h2
        className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What you can do with one prompt
      </h2>

      <p className="mb-10 max-w-2xl text-white/70">
        Visual first. Hover any tile to see the detail. Built for creators, not busywork.
      </p>

      {/* Responsive masonry-ish grid: 3 cols on xl, 2 on md, stack on mobile */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ key, ...it }) => (
          <Card key={key} {...it} />
        ))}
      </div>
    </section>
  );
}

function Card({
  title,
  body,
  art,
}: {
  title: string;
  body: string;
  art: string;
}) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-3xl",
        "border border-white/10 bg-white/[.06] backdrop-blur",
        "transition will-change-transform hover:translate-y-[-2px] hover:border-white/15",
      ].join(" ")}
    >
      {/* Visual */}
      <div className="relative h-44 w-full overflow-hidden md:h-48">
        <Image
          src={art}
          alt=""
          fill
          priority
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Copy */}
      <div className="p-5">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/80">{body}</p>
        </div>
      </div>
    </article>
  );
}

/* ---------------------- Minimal inline icons ---------------------- */

/* function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ReelIcon(props: React.SVGProps<SVGSVGElement>) { */

/* function ReelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </svg>
  );
} */

/* function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M21 3L10 14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 3l-7 18-4-8-8-4 19-6z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SwitchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="8" width="18" height="8" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CopilotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
} */
