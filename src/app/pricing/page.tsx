// app/pricing/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import FooterMega from "@/components/FooterMega";
import { useMagicLink } from "@/hooks/useMagicLink";

/** ---- Types & constants ---- */
type Cycle = "monthly" | "annually";

type Plan = {
  id: "free" | "starter" | "growth" | "pro";
  name: string;
  tagline: string;
  bestFor: string;
  monthly: number; // base monthly price
  credits: string;
  limits: string[];
  features: string[];
  cta: { label: string; href?: string };
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Test the power of Zap.",
    bestFor: "New creators getting started",
    monthly: 0,
    credits: "",
    limits: ["~150 credits (~20 assets)", "Unlimited scheduling", "7-day content history", "Watermark on visuals"],
    features: [
      "Posts + images",
      "Basic brand prompts",
      "1 workspace",
      "Email support",
    ],
    cta: { label: "Start free", href: "https://zap.sonetz.com/" },
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Create every week without the grind.",
    bestFor: "Solo creators & freelancers",
    monthly: 15,
    credits: "",
    limits: ["1,000 credits / month", "Scheduling across 5 platforms", "30-day history"],
    features: [
      "Content Hub (posts + images)",
      "Watermark on visuals",
      "Voice lock (basic)",
      "Smart captions & CTAs",
    ],
    cta: { label: "Get Starter" },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Scale content that actually performs.",
    bestFor: "Growing brands & small teams",
    monthly: 49,
    credits: "",
    limits: ["5,000 credits / month", "Scheduling across 15+ platforms", "90-day history"],
    features: [
      "Image + Video Hub (short films, reels, edits)",
      "Watermark removed",
      "Analytics dashboard",
      "Brand voice memory",
    ],
    cta: { label: "Upgrade to Growth" },
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Operate like a media company.",
    bestFor: "Multi-brand teams & agencies",
    monthly: 99,
    credits: "",
    limits: ["15,000 credits / month", "Multi-brand management (2–3 brands)", "Unlimited history"],
    features: [
      "Everything in Growth",
      "Advanced analytics & insights",
      "Priority support & feature access",
      "Shared workspace",
    ],
    cta: { label: "Go Pro" },
  },
];

// 20% off when billed annually
const ANNUAL_DISCOUNT = 0.2;

/** ---- UI helpers ---- */
function priceFor(plan: Plan, cycle: Cycle) {
  if (plan.monthly === 0) return "$0";
  if (cycle === "monthly") return `$${plan.monthly}`;
  const perMonth = Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT));
  return `$${perMonth}`;
}

function yearlyTotal(plan: Plan) {
  if (plan.monthly === 0) return "";
  const annualPrice = Math.round(plan.monthly * 12 * (1 - ANNUAL_DISCOUNT));
  return `$${annualPrice}/year`;
}

function subLabel(cycle: Cycle) {
  return cycle === "monthly" ? "/mo" : "/mo";
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" className="text-[#AC7BFF]">
    <path
      fill="currentColor"
      d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
    />
  </svg>
);

/** ---- Email Modal for Magic Link ---- */
function MagicSignupModal({
  plan,
  interval,
  onClose,
}: {
  plan: "starter" | "growth" | "pro";
  interval: "month" | "year";
  onClose: () => void;
}) {
  const redirectTo = `/billing/checkout?plan=${plan}&interval=${interval}`;
  const { status, error, lastEmail, send, reset } = useMagicLink({ redirectTo, cooldownMs: 12000 });

  const [email, setEmail] = useState("");

  // Prefill from localStorage and from current session (/api/zap/auth/me)
  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("zap:lastEmail") : null;
      if (stored && !email) setEmail(stored);
    } catch {}
  }, []); // eslint-disable-line

  useEffect(() => {
    // Only try session prefill if we don't have an email yet
    if (email) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/zap/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        const sessionEmail = (data?.email || "").toString();
        if (sessionEmail && !cancelled) {
          setEmail(sessionEmail);
          try {
            localStorage.setItem("zap:lastEmail", sessionEmail);
          } catch {}
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [email]);

  // Persist successful address to localStorage
  useEffect(() => {
    if (status === "sent" && (lastEmail || email)) {
      try {
        localStorage.setItem("zap:lastEmail", (lastEmail || email).trim().toLowerCase());
      } catch {}
    }
  }, [status, lastEmail, email]);

  const headerCopy = {
    starter: "Get Starter",
    growth: "Upgrade to Growth",
    pro: "Go Pro",
  }[plan];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          reset();
          onClose();
        }}
      />
      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f0a16]/95 p-6 text-white shadow-2xl">
        {/* Accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(172,123,255,0.35), transparent)" }}
        />
        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute right-3 top-3 rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="mb-2 text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {headerCopy}
        </h3>
        <p className="mb-5 text-white/80">
          Enter your email and we&apos;ll send you a secure sign-in link. You&apos;ll land
          on checkout for <span className="font-semibold capitalize">{plan}</span> ({interval} billing).
        </p>

        {status === "sent" ? (
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-300">
            Link sent to <span className="font-semibold">{lastEmail || email}</span>. Check your inbox!
          </div>
        ) : (
          <>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
              Work email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="mb-3 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              autoFocus
            />
            {error && <div className="mb-3 text-sm text-rose-300">{error}</div>}

            <button
              onClick={() => send(email)}
              disabled={status === "submitting"}
              className={[
                "w-full rounded-xl px-6 py-3 font-semibold text-white transition-all",
                status === "submitting"
                  ? "cursor-not-allowed bg-white/20"
                  : "bg-gradient-to-r from-[#AC7BFF] to-[#7A4DFF] shadow-lg shadow-[#AC7BFF]/25 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#AC7BFF]/30",
              ].join(" ")}
            >
              {status === "submitting" ? "Sending link…" : "Email me a sign-in link"}
            </button>
            <p className="mt-3 text-center text-xs text-white/60">
              No password needed. Link expires in 15 minutes.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/** ---- Page ---- */
export default function PricingPage() {
  const [cycle, setCycle] = useState<Cycle>("annually");
  const [modalPlan, setModalPlan] = useState<null | "starter" | "growth" | "pro">(null);
  const interval: "month" | "year" = cycle === "annually" ? "year" : "month";

  return (
    <>
      <div className="relative min-h-screen">
        {/* Global smooth gradient */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20"
          style={{
            backgroundImage: [
              "radial-gradient(60rem 40rem at 10% -10%, rgba(170,115,255,.18), transparent 55%)",
              "radial-gradient(40rem 30rem at 90% -10%, rgba(120,80,255,.18), transparent 60%)",
              "radial-gradient(80rem 60rem at 30% 50%, rgba(15,8,25,.4), transparent 70%)",
              "radial-gradient(70rem 50rem at 70% 80%, rgba(120,80,255,.15), transparent 60%)",
              "linear-gradient(180deg, rgba(12,8,18,0.95) 0%, rgba(9,7,12,1) 50%, rgba(8,6,11,1) 100%)"
            ].join(", "),
          }}
        />
        
        <Header />

        <main className="relative text-white">
          <style>{`:root{--zap:#AC7BFF}`}</style>

          {/* Header */}
          <section className="mx-auto max-w-7xl px-6 pt-20 pb-12">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[.2em] text-[#AC7BFF]">
                Choose your plan
              </p>
              <h1
                className="mt-2 text-4xl font-semibold leading-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pricing that grows
                <br />
                with your content
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-white/75">
                <span className="text-white/60">Start free, upgrade when you&apos;re ready to scale.</span>
              </p>

              {/* Billing Cycle Toggle */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className={`text-sm font-medium transition-colors ${cycle === "monthly" ? "text-white" : "text-white/60"}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setCycle(cycle === "monthly" ? "annually" : "monthly")}
                  className="group relative h-7 w-14 rounded-full border border-white/20 bg-white/10 backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                  aria-label="Toggle billing cycle"
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-gradient-to-r from-[#AC7BFF] to-[#7A4DFF] shadow-lg transition-all duration-300 ${
                      cycle === "monthly" ? "left-0.5" : "left-[1.875rem]"
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium transition-colors ${cycle === "annually" ? "text-white" : "text-white/60"}`}>
                    Annually
                  </span>
                  <span className="rounded-full border border-[#AC7BFF]/30 bg-[#AC7BFF]/20 px-2.5 py-0.5 text-xs font-medium text-[#AC7BFF]">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  cycle={cycle}
                  onSelectPaidPlan={(planId) => {
                    if (planId === "free") return;
                    setModalPlan(planId as "starter" | "growth" | "pro");
                  }}
                />
              ))}
            </div>
          </section>

          {/* Enterprise CTA */}
          <section className="mx-auto max-w-4xl px-6 pb-20">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] p-8 text-center backdrop-blur md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(172,123,255,0.3), transparent)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(120,80,255,0.2), transparent)" }}
              />

              <h2
                className="text-3xl font-bold tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Need more than 3 brands?
              </h2>
              <p className="mt-4 text-lg text-white/75">
                Enterprise plans with custom credit limits, dedicated support, and advanced team features.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/contact"
                  className="rounded-xl bg-gradient-to-r from-[#AC7BFF] to-[#7A4DFF] px-8 py-3 font-semibold text-white shadow-lg shadow-[#AC7BFF]/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#AC7BFF]/30"
                >
                  Talk to sales
                </a>
                <a
                  href="/demo"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/20"
                >
                  Book a demo
                </a>
              </div>
            </div>
          </section>

          {/* SEO JSON-LD */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: "Zap AI Content Creation Platform",
                description: "AI-powered content creation platform for creators and brands",
                offers: PLANS.filter(p => p.monthly > 0).map(plan => ({
                  "@type": "Offer",
                  name: plan.name,
                  description: plan.tagline,
                  price: plan.monthly,
                  priceCurrency: "USD",
                  priceValidUntil: "2025-12-31",
                  availability: "https://schema.org/InStock",
                })),
              }),
            }}
          />
        </main>
        
        <FooterMega />
      </div>

      {/* Modal mount */}
      {modalPlan && (
        <MagicSignupModal
          plan={modalPlan}
          interval={cycle === "annually" ? "year" : "month"}
          onClose={() => setModalPlan(null)}
        />
      )}
    </>
  );
}

/** ---- Card ---- */
function PlanCard({
  plan,
  cycle,
  onSelectPaidPlan,
}: {
  plan: Plan;
  cycle: Cycle;
  onSelectPaidPlan: (planId: Plan["id"]) => void;
}) {
  const price = useMemo(() => priceFor(plan, cycle), [plan, cycle]);
  const yearlyPrice = useMemo(() => yearlyTotal(plan), [plan]);

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-3xl border backdrop-blur transition-all duration-300",
        plan.highlight 
          ? "border-[#AC7BFF]/30 bg-white/[.08] shadow-2xl shadow-[#AC7BFF]/10 hover:shadow-[#AC7BFF]/20" 
          : "border-white/10 bg-white/[.05] hover:border-white/20 hover:bg-white/[.08]",
      ].join(" ")}
    >
      {/* Enhanced gradient sweeps */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ 
          background: plan.highlight 
            ? "conic-gradient(from 220deg, rgba(172,123,255,0.4), rgba(202,168,255,0.3), rgba(172,123,255,0))"
            : "conic-gradient(from 220deg, rgba(172,123,255,0.2), rgba(202,168,255,0.15), rgba(172,123,255,0))"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-10 h-40 w-40 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ 
          background: plan.highlight
            ? "radial-gradient(closest-side, rgba(167,123,255,0.3), transparent)"
            : "radial-gradient(closest-side, rgba(167,123,255,0.15), transparent)"
        }}
      />

      <div className="relative p-8">
        {/* Recommended badge */}
        {plan.highlight && (
          <div className="absolute right-6 top-6">
            <span className="rounded-full border border-[#AC7BFF]/30 bg-[#AC7BFF]/20 px-3 py-1 text-xs font-semibold text-[#AC7BFF] shadow-lg shadow-[#AC7BFF]/10">
              Most Popular
            </span>
          </div>
        )}

        {/* Plan header */}
        <div className="mb-6">
          <h3
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {plan.name}
          </h3>
          <p className="mt-2 text-white/80">{plan.tagline}</p>
          <p className="mt-1 text-sm text-white/60">{plan.bestFor}</p>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{price}</span>
            {plan.monthly > 0 && (
              <span className="text-white/70">{subLabel(cycle)}</span>
            )}
          </div>
          {cycle === "annually" && plan.monthly > 0 && (
            <div className="mt-1 space-y-0.5">
              <p className="text-sm text-white/60">
                {yearlyPrice} billed annually
              </p>
              <p className="text-xs text-[#AC7BFF]">
                Save ${Math.round(plan.monthly * 12 * ANNUAL_DISCOUNT)} per year
              </p>
            </div>
          )}
        </div>

        {/* Plan limits */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
            Plan Limits
          </h4>
          <ul className="space-y-3">
            {plan.limits.map((limit, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <Check />
                <span className="leading-relaxed">{limit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
            Features
          </h4>
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <Check />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        {plan.id === "free" && plan.cta.href ? (
          <a
            href={plan.cta.href}
            className="block w-full rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold text-white backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white/20"
          >
            {plan.cta.label}
          </a>
        ) : (
          <button
            onClick={() => onSelectPaidPlan(plan.id)}
            className={[
              "block w-full rounded-xl px-6 py-3 text-center font-semibold transition-all duration-200",
              plan.highlight
                ? "bg-gradient-to-r from-[#AC7BFF] to-[#7A4DFF] text-white shadow-lg shadow-[#AC7BFF]/25 hover:scale-105 hover:shadow-xl hover:shadow-[#AC7BFF]/30"
                : "border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:scale-105",
            ].join(" ")}
          >
            {plan.cta.label}
          </button>
        )}
      </div>
    </article>
  );
}
