// src/services/auth/magic.ts
import { api } from "@/lib/api/auth-client";

type MagicRequestPayload = {
  email: string;
  redirect_to?: string | null; // e.g. "/onboarding"
};

type MagicRequestResponse = {
  detail: string; // "Magic link sent"
};

export async function requestMagicLink(email: string, redirectTo?: string | null) {
  const payload: MagicRequestPayload = { email, redirect_to: redirectTo ?? null };
  return api.post<MagicRequestResponse>("/api/zap/auth/magic/request", payload);
}
