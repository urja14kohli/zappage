"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { ShowcaseStrip, ShowcaseItem } from "@/components/ShowcaseStrip";
import Platforms from "@/components/Platforms";
import FooterCta from "@/components/FooterCta";
import FaqAccordion from "@/components/FaqAccordion";
import ImpactTrio from "@/components/ImpactTrio";
import Testimonials from "@/components/Testimonials";
import FeatureShowcase from "@/components/FeatureShowcase";
import FooterMega from "@/components/FooterMega";
import { useMagicLink } from "@/hooks/useMagicLink";

const ITEMS: ShowcaseItem[] = [
  { id:"img-hero", kind:"image", kicker:"By prompt", title:"Studio hero visual",
    prompt:"Studio quality hero image of a sneaker on floating neon blocks", poster:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=760&fit=crop&crop=center", likes: 432 },
  { id:"img-flatlay", kind:"image", kicker:"By prompt", title:"Skincare flatlay",
    prompt:"Minimalist skincare flatlay with pastel background", poster:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=760&fit=crop&crop=center", likes: 178 },
  { id:"ref-ad", kind:"image", kicker:"With reference", title:"Brand banner",
    prompt:"Match this brand color palette and make a new Instagram ad banner", poster:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=760&fit=crop&crop=center", likes: 204 },
  { id:"reel-founder", kind:"video", kicker:"On brand", title:"15s founder reel",
    prompt:"15 second Reel that hooks with startup founder struggles and ends positive",
    poster:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=760&fit=crop&crop=center", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", likes: 521 },
  { id:"saas-ad", kind:"video", kicker:"By prompt", title:"TikTok ad",
    prompt:"Short TikTok ad for a SaaS tool. Show problem then quick fix then CTA",
    poster:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=760&fit=crop&crop=center", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", likes: 409 },
  { id:"story", kind:"video", kicker:"On brand", title:"Founder story",
    prompt:"One minute founder story with cut scenes and emotional voiceover",
    poster:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=760&fit=crop&crop=center", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", likes: 289 },
];

export default function Page() {
  // Magic link hook
  const { status, error, lastEmail, send } = useMagicLink({ redirectTo: "/onboarding" });
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await send(email);
  };

  const isSubmitting = status === "submitting";
  const isSent = status === "sent";

  return (
    <>
      {/* UNIFIED PAGE BACKGROUND */}
      <div className="relative min-h-screen">
        {/* Global smooth gradient */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20"
          style={{
            backgroundImage: [
              "radial-gradient(80rem 60rem at 15% 0%, rgba(172,123,255,.15), transparent 50%)",
              "radial-gradient(60rem 45rem at 85% 0%, rgba(120,80,255,.12), transparent 55%)",
              "radial-gradient(100rem 70rem at 20% 40%, rgba(170,115,255,.08), transparent 60%)",
              "radial-gradient(90rem 60rem at 80% 60%, rgba(120,80,255,.10), transparent 55%)",
              "radial-gradient(70rem 50rem at 50% 85%, rgba(172,123,255,.12), transparent 50%)",
              "linear-gradient(180deg, rgba(11,9,17,0.92) 0%, rgba(9,7,12,0.96) 30%, rgba(8,6,11,0.98) 60%, rgba(7,5,10,1) 100%)"
            ].join(", "),
          }}
        />

        <Header />

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-14">
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] drop-shadow"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Grow your audience with <span className="text-[#AC7BFF]">Zap</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/80 text-lg">
              Type once. Zap turns it into posts, images and videos then schedules across 14+ channels. Fast, on brand, tuned for reach.
            </p>

            {/* Magic link capture */}
            <form onSubmit={onSubmit} className="mt-7 w-full max-w-[600px]" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-16 w-full rounded-2xl border border-white/15 bg-white/10 px-6 text-lg text-white/90
                             outline-none backdrop-blur placeholder:text-white/50 focus:border-white/20"
                  aria-label="Email"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-16 shrink-0 rounded-2xl bg-[#7A4DFF] px-6 text-base font-medium text-white 
                             shadow-[0_12px_40px_rgba(122,77,255,.4)] transition-all duration-200 
                             hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(122,77,255,.5)] 
                             whitespace-nowrap min-w-[160px] flex items-center justify-center disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Start free"}
                </button>
              </div>

              {/* States */}
              <div className="mt-3 min-h-[22px]">
                {isSent && (
                  <p className="text-sm text-emerald-300/90" role="status" aria-live="polite">
                    Check <strong className="text-white/90">{lastEmail}</strong>. Link expires in ~15 minutes.
                  </p>
                )}
                {error && (
                  <p className="text-sm text-red-300/95" role="alert" aria-live="assertive">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* CREATE STRIP */}
        <section id="create" className="relative py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              What Zap can create
            </h2>
            <p className="mt-2 text-white/70">Hover to view the exact prompt. Tap on mobile.</p>
            <div className="mt-8">
              <ShowcaseStrip items={ITEMS} />
            </div>
          </div>
        </section>

        {/* PLATFORMS */}
        <Platforms />

        {/* FEATURE SHOWCASE - WITH ONE PROMPT ZAP CAN */}
        <FeatureShowcase />

        {/* IMPACT TRIO */}
        <ImpactTrio />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* FAQ ACCORDION */}
        <FaqAccordion />

        {/* FOOTER CTA */}
        <div className="px-6">
          <FooterCta />
        </div>
      </div>

      <FooterMega />
    </>
  );
}
