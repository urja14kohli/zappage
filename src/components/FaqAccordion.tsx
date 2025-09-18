"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

type QA = { q: string; a: string; href?: string };

const FAQS: QA[] = [
  {
    q: "How does Zap work",
    a: "You type one prompt. Zap makes posts, images, and short videos in your voice then sizes and schedules for 14+ channels.",
    href: "/how-it-works"
  },
  {
    q: "Can it match my brand voice",
    a: "Yes. Paste a couple of samples and Zap learns your tone for captions, scripts, and visuals. You can edit any time."
  },
  {
    q: "What can I publish to",
    a: "X, Instagram, LinkedIn, YouTube, Pinterest, Reddit, Threads, Snapchat, Twitch, Medium, Substack, WhatsApp, Facebook, TikTok."
  },
  {
    q: "Do I still control quality",
    a: "Always. Pick versions, tweak hooks, swap footage, and approve before posting."
  },
  {
    q: "How fast is it",
    a: "Under a minute for a small pack like a post, a caption, a hero visual, and a 15 second reel."
  }
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2
          className="mb-8 text-center text-5xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Got questions
          <span className="text-[#AC7BFF]">?</span>
        </h2>

        <div className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[.06] p-1 backdrop-blur"
              >
                <button
                  className="flex w-full items-center justify-between rounded-[calc(theme(borderRadius.3xl)-.25rem)] px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <span className="text-lg font-semibold">
                    {item.q}
                    {"?"}
                  </span>
                  <HiChevronDown
                    className={`shrink-0 text-2xl transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* answer */}
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-6 mb-5 mt-0 rounded-2xl bg-white/[.04] p-5 text-white/80">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* small note */}
        <p className="mt-6 text-center text-sm text-white/60">
          Can&apos;t find it? <a href="/help" className="underline">Visit help</a> or <a href="/contact" className="underline">contact us</a>.
        </p>
      </div>
    </section>
  );
}
