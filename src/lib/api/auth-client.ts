// src/lib/api/auth-client.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_ZAP_BACKEND_URL ||

  (typeof window !== "undefined" && (window as { __ZAP_BACKEND__?: string }).__ZAP_BACKEND__) ||
  "https://zap-api.sonetz.com";


let authToken: string | null = null;

export const setGlobalAuthToken = (token: string | null) => {
  authToken = token;
};
export const getGlobalAuthToken = () => authToken;

function getAuthTokenFromCookie(): string | null {
  if (authToken) return authToken;
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; access_token=`);
  const cookieToken = parts.length === 2 ? parts.pop()?.split(";")[0] || null : null;
  return cookieToken;
}

function buildInit(options: RequestInit = {}): RequestInit {
  const token = getAuthTokenFromCookie();
  return {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
}

async function handleJson<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    authToken = null;
    if (typeof document !== "undefined") {
      document.cookie = "access_token=; Max-Age=0; path=/";
      document.cookie = "refresh_token=; Max-Age=0; path=/";
    }
    const err = new Error("Unauthorized") as Error & { status?: number };
    err.status = 401;
    throw err;
  }

  if (res.status === 204) return {} as T;

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    if (!res.ok) {
      const err = new Error(`${res.status}`) as Error & { status?: number };
      err.status = res.status;
      throw err;
    }
    return {} as T;
  }

  if (!res.ok) {
    const msg =
      typeof data === "string"
        ? data
        : data?.detail
        ? typeof data.detail === "string"
          ? data.detail
          : JSON.stringify(data.detail)
        : data?.message || "API Error";
    const err = new Error(msg) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }

  return data as T;
}

function parseFilename(cd: string | null | undefined): string | undefined {
  if (!cd) return;
  const m = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i);
  if (m && m[1]) {
    try {
      return decodeURIComponent(m[1]);
    } catch {
      return m[1];
    }
  }
}

async function handleBlob(res: Response): Promise<{ blob: Blob; filename?: string }> {
  if (res.status === 401) {
    authToken = null;
    if (typeof document !== "undefined") {
      document.cookie = "access_token=; Max-Age=0; path=/";
      document.cookie = "refresh_token=; Max-Age=0; path=/";
    }
    const err = new Error("Unauthorized") as Error & { status?: number };
    err.status = 401;
    throw err;
  }
  if (!res.ok) {
    let msg = "";
    try {
      msg = await res.text();
    } catch {}
    const err = new Error(msg || `API Error ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  const blob = await res.blob();
  const filename = parseFilename(res.headers.get("Content-Disposition"));
  return { blob, filename };
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, buildInit(options));
  return handleJson<T>(res);
}

export const api = {
  get:  <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "POST", body: data ? JSON.stringify(data) : undefined }),
  put:  <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "PUT",  body: data ? JSON.stringify(data) : undefined }),
  delete:<T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "DELETE", body: data ? JSON.stringify(data) : undefined }),

  getBlob: async (endpoint: string): Promise<{ blob: Blob; filename?: string }> => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, buildInit({ method: "GET" }));
    return handleBlob(res);
  },
};
