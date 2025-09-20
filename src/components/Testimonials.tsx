"use client";

type Testimonial = {
  quote: string;
  headline: string;
  name: string;
  role: string;
  avatar: string; // /public/avatars/...
  rating: number; // 1..5
};

const DATA: Testimonial[] = [
  {
    headline: "Content that finally sounds like us",
    quote:
      "Zap learned our voice in minutes. We ship posts, reels, and carousels without rewriting every line.",
    name: "Maya Singh",
    role: "Founder, Kairo Studio",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    headline: "Launch weeks feel calm now",
    quote:
      "One prompt turns into a full launch pack. Design stays on-brand, copy stays tight.",
    name: "Arjun Mehta",
    role: "Head of Growth, Revel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    headline: "Reach across every channel",
    quote:
      "We post to 14+ platforms in a click. Scheduling and sizes are handled. Team just approves.",
    name: "Leah Gomez",
    role: "Creator",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-16">
      {/* content container */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-2 text-sm text-white/70">Testimonial</div>
          <h2
            className="text-4xl font-semibold leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[#AC7BFF]">Customer</span> Success Stories
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DATA.map((t, i) => (
            <article
              key={i}
              className={`rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition shadow-[0_10px_40px_rgba(0,0,0,.35)] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,.4)] ${
                i === 0 ? 'animate-float-1' : i === 1 ? 'animate-float-2' : 'animate-float-3'
              } hover:[animation-play-state:paused]`}
            >
              {/* quote mark */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mb-4 h-6 w-6"
                style={{ color: "#AC7BFF" }}
                fill="currentColor"
              >
                <path d="M7.1 11.2C8.8 10.6 10 9 10 7.2 10 4.9 8.1 3 5.8 3 3.5 3 1.6 4.9 1.6 7.2c0 2.3 1.9 4.2 4.2 4.2.3 0 .7 0 1-.2l-1.5 5.8h4l-1.2-5.8zM21 11.2c1.7-.6 2.9-2.2 2.9-4 0-2.3-1.9-4.2-4.2-4.2S15.5 4.9 15.5 7.2c0 2.3 1.9 4.2 4.2 4.2.3 0 .7 0 1-.2l-1.5 5.8h4l-1.2-5.8z" />
              </svg>

              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.headline}
              </h3>
              <p className="mt-3 text-white/80">{t.quote}</p>

              <hr className="my-5 border-white/10" />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#AC7BFF] to-[#7A4DFF] flex items-center justify-center text-white font-semibold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-white/60">{t.role}</div>
                  </div>
                </div>

                {/* Accessible star rating */}
                <Stars rating={t.rating} />
              </div>
            </article>
          ))}
        </div>

        {/* SEO: Review structured data (visible quotes only) */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: DATA.map((t, idx) => ({
                "@type": "Review",
                position: idx + 1,
                reviewBody: t.quote,
                name: t.headline,
                author: { "@type": "Person", name: t.name },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: String(t.rating),
                  bestRating: "5",
                  worstRating: "1",
                },
              })),
            }),
          }}
        />

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
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      title={`${rating} out of 5`}
    >
      {stars.map((filled, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${filled ? "" : "opacity-40"}`}
          style={{ color: "#AC7BFF" }}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
        </svg>
      ))}
    </div>
  );
}
