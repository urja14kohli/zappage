"use client";

export default function FooterCta() {
  return (
    <section className="relative mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[.06] px-8 py-14 text-center backdrop-blur">
      <p className="mb-3 text-sm text-white/70">Create like a pro</p>
      <h2
        className="mx-auto max-w-3xl text-4xl font-semibold leading-tight md:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Grow with Zap<br />all your content in one prompt
      </h2>

      {/* email cta */}
      <div className="mx-auto mt-7 flex max-w-md items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
        <input
          type="email"
          required
          placeholder="Enter your email..."
          className="flex-1 rounded-lg bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-white/40"
        />
        <a 
          href="https://zap.sonetz.com/"
          className="whitespace-nowrap rounded-lg bg-[#7A4DFF] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_32px_rgba(122,77,255,.4)] transition hover:translate-y-[-1px] flex items-center justify-center"
        >
          Start free
        </a>
      </div>

    </section>
  );
}
