export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = "http://localhost:8000";
    const res = await fetch(
        `${baseUrl}${url}`,
        {
            ...options,
            credentials: "include", // 🔥 required for auth cookies
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        }
    );

    console.log('res '+ res)

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Something went wrong");
    }

    return res.json();
}
