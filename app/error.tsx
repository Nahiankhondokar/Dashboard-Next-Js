"use client";

import { useEffect } from "react";
import { useAuthError } from "@/components/providers/AuthProvider";

export default function GlobalError({ error }: { error: Error }) {
    const handleAuthError = useAuthError();

    useEffect(() => {
        handleAuthError(error);
    }, [error]);

    return <p>Something went wrong</p>;
}
