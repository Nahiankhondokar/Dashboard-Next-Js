export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const token = typeof window !== "undefined"
            ? localStorage.getItem("auth_token")
            : null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (res.status === 401 || res.status === 403) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Something went wrong");
    }

    return res.json();
}
