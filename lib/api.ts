// lib/api.ts
import { ApiError } from "@/type/api-error";

export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("auth_token")
            : null;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            ...options,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        }
    );

    if (res.status === 401 || res.status === 403) {
        // 🔥 token invalid / expired
        localStorage.removeItem("auth_token");
        throw new ApiError(res.status, "Unauthorized");
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new ApiError(res.status, error.message || "Request failed");
    }

    return res.json();
}
