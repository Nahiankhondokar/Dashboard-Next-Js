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

    const isFormData = options.body instanceof FormData;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            ...options,
            headers: {
                Accept: "application/json",
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        }
    );

    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("auth_token");
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        throw new ApiError(res.status, "Unauthorized");
    }

    if (!res.ok) {
        // FIX 1: Cast the error response so it isn't "any"
        const errorData = (await res.json().catch(() => ({}))) as { message?: string };
        console.log(errorData.message);
        throw new ApiError(res.status, errorData.message || "Request failed");
    }

    // FIX 2: Explicitly cast the return to T
    return (await res.json()) as T;
}