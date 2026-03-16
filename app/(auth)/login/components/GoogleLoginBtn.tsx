'use client';

// FIX: Import CredentialResponse type
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
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

    // FIX: Replaced 'any' with 'CredentialResponse'
    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        const idToken = credentialResponse?.credential;
        if (!idToken) return;

        try {
            const res = await apiFetch<GoogleLoginResponse>("auth/google", {
                method: "POST",
                body: JSON.stringify({
                    id_token: idToken
                }),
            });

            setUser(res.user);
            setToken(res.token);

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