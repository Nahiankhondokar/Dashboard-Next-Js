// utils/toFormData.ts
export function toFormData(values: Record<string, any>, opts?: { arrayFormat?: "brackets" | "json", booleanFormat?: "1/0" | "true/false" }) {
    const fd = new FormData();
    const { arrayFormat = "brackets", booleanFormat = "1/0" } = opts ?? {};

    Object.entries(values).forEach(([key, val]) => {
        if (val === null || val === undefined) return;

        // File / Blob
        if (val instanceof File || val instanceof Blob) {
            fd.append(key, val);
            return;
        }

        // Arrays
        if (Array.isArray(val)) {
            if (arrayFormat === "brackets") {
                // PHP style: socials[] = value
                val.forEach((item) => {
                    // convert item primitives to string
                    if (item === null || item === undefined) return;
                    fd.append(`${key}[]`, typeof item === "object" ? JSON.stringify(item) : String(item));
                });
            } else {
                // JSON style
                fd.append(key, JSON.stringify(val));
            }
            return;
        }

        // Booleans
        if (typeof val === "boolean") {
            if (booleanFormat === "1/0") {
                fd.append(key, val ? "1" : "0");
            } else {
                fd.append(key, val ? "true" : "false");
            }
            return;
        }

        // Numbers
        if (typeof val === "number") {
            fd.append(key, String(val));
            return;
        }

        // Objects (non-File)
        if (typeof val === "object") {
            fd.append(key, JSON.stringify(val));
            return;
        }

        // Strings
        fd.append(key, String(val));
    });

    return fd;
}