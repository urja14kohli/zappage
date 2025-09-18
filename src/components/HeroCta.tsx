"use client";

// components/HeroCta.tsx
export default function HeroCta() {
  return (
    <div className="mx-auto mt-6 w-full max-w-[480px]"> {/* more compact - reduced from 560px to 480px */}
      <form className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email..."
          className="h-14 w-full rounded-2xl border border-white/12 bg-white/[.05] px-4 text-white/90
                     outline-none ring-0 backdrop-blur placeholder:text-white/50
                     focus:border-white/20"
        />
        <button
          type="submit"
          className="h-14 shrink-0 rounded-2xl border border-white/12 bg-white/[.06] px-4 text-base text-white
                     transition hover:bg-white/[.1] whitespace-nowrap leading-none min-w-[140px]"
        >
          Start free
        </button>
      </form>

      {/* optional helper line */}
      {/* <p className="mt-2 text-xs text-white/60">No card needed. Cancel anytime.</p> */}
    </div>
  );
}
