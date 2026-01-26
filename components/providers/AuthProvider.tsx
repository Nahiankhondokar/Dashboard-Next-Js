"use client";

import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/type/api-error";

const AuthContext = createContext<(e: unknown) => void>(() => {});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleError = (error: unknown) => {
        if (error instanceof ApiError && error.status === 401) {
            localStorage.removeItem("auth_token");
            router.replace("/login");
        }

    };

    return (
        <AuthContext.Provider value={handleError}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthError = () => useContext(AuthContext);
