// lib/errorMessage.ts
export default function errorMessage(err: unknown): string {
    if (!err) return "Unknown error";
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    try {
        // fallback: try to stringify
        return JSON.stringify(err);
    } catch {
        return "Unknown error";
    }
}