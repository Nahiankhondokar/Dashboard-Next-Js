// components/providers/GoogleOauthProvider.tsx
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Toaster } from 'sonner';

export default function GoogleOauthProvider({ children }: { children: ReactNode }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <AuthProvider>
                {children}
                <Toaster position="top-right" richColors />
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}