// src/hooks/useMagicLink.ts
import { useCallback, useMemo, useRef, useState } from "react";
import { requestMagicLink } from "@/services/auth/magic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type MagicStatus = "idle" | "submitting" | "sent" | "error";

export function useMagicLink(opts?: { redirectTo?: string | null; cooldownMs?: number }) {
  const { redirectTo = "/onboarding", cooldownMs = 15000 } = opts || {};
  const [status, setStatus] = useState<MagicStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastEmail, setLastEmail] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  const canSubmit = useMemo(() => status !== "submitting", [status]);

  const send = useCallback(
    async (email: string) => {
      setError(null);

      const trimmed = email.trim().toLowerCase();
      if (!EMAIL_RE.test(trimmed)) {
        setStatus("error");
        setError("Enter a valid email.");
        return;
      }
      if (!canSubmit) return;

      setStatus("submitting");
      try {
        await requestMagicLink(trimmed, redirectTo);
        setLastEmail(trimmed);
        setStatus("sent");

        // simple cooldown to discourage hammering
        if (cooldownMs > 0) {
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setStatus("idle");
            timerRef.current = null;
          }, cooldownMs) as unknown as number;
        }
      } catch (e: unknown) {
        setStatus("error");
        setError((e as Error)?.message || "Could not send link. Try again.");
      }
    },
    [redirectTo, cooldownMs, canSubmit]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { status, error, lastEmail, canSubmit, send, reset };
}
