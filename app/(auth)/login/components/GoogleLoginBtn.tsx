// components/auth/GoogleLoginBtn.tsx
'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import useAuthStore from "@/stores/useAuthStore";
import { apiFetch } from "@/lib/api";
import { User } from "@/type/user";

interface GoogleLoginResponse {
    token: string;
    user: User;
}

export default function GoogleLoginBtn() {
    const router = useRouter();

    const setUser = useAuthStore(state => state.setUser);
    const setToken = useAuthStore(state => state.setToken);

    const handleSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse?.credential;
        if (!idToken) return;

        try {
            const res = await apiFetch<GoogleLoginResponse>("auth/google", {
                method: "POST",
                body: JSON.stringify({
                    id_token: idToken
                }),
            });

            // store user in zustand
            setUser(res.user);

            // store token
            setToken(res.token);

            // optional: persist token for middleware / refresh
            document.cookie = `auth_token=${res.token}; path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
            localStorage.setItem("auth_token", res.token);

            router.push("/dashboard");

        } catch (error) {
            console.error("Google login failed", error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Google sign-in failed")}
        />
    );
}