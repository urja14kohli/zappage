"use client";

<<<<<<< Updated upstream
=======
import { useState } from "react";
import { useMagicLink } from "@/hooks/useMagicLink";

>>>>>>> Stashed changes
// components/HeroCta.tsx
export default function HeroCta() {
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
<<<<<<< Updated upstream
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

=======
    <div className="mt-6">
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-[480px]" noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border border-white/12 bg-white/[.05] px-4 text-white/90 outline-none ring-0 backdrop-blur placeholder:text-white/50 focus:border-white/20"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="h-14 shrink-0 rounded-2xl bg-[#7A4DFF] px-6 text-white font-medium shadow-[0_8px_32px_rgba(122,77,255,.4)] transition hover:translate-y-[-1px] hover:shadow-[0_12px_40px_rgba(122,77,255,.5)] whitespace-nowrap min-w-[140px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Start free'}
          </button>
        </div>
        
        {/* States */}
        <div className="mt-3 min-h-[20px]">
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
      
>>>>>>> Stashed changes
      {/* optional helper line */}
      {/* <p className="mt-2 text-xs text-white/60">No card needed. Cancel anytime.</p> */}
    </div>
  );
}
