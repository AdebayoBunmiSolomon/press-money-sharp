import { BASE_URL } from "@env";

type FetchMethod = "POST" | "GET" | "DELETE" | "PUT";

interface FetchOptions {
  endpoint: string;
  method?: FetchMethod;
  body?: any;
  token?: string;
  extraHeaders?: Record<string, string>;
}

export const FETCH = async ({
  endpoint,
  method = "GET",
  body,
  token,
  extraHeaders = {},
}: FetchOptions) => {
  const headers: Record<string, string> = {
    ...extraHeaders,
  };

  // Add Authorization if token provided
  if (token) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  // Prevent setting Content-Type for FormData
  const isFormData = body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server error: ${res.status} - ${text}`);
  }

  const json = await res.json();
  return { status: res.status, data: json };
};
