// --- Types ---
export type Section = "home" | "about" | "portfolio" | "contact";
export type Home  = {
    name : string,
    bio: string | null,
    subtitle: string | null,
    image: string | null
}