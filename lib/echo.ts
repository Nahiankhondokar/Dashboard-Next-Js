import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

if (typeof window !== 'undefined') {
    (window as any).Pusher = Pusher; // Force the global assignment
}

export const echo = typeof window !== 'undefined'
    ? new Echo({
        broadcaster: 'reverb',
        // Do NOT pass client: Pusher here
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
        wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 8080,
        forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
        enabledTransports: ['ws', 'wss'],
        // 🔴 VERY IMPORTANT (fixes your original issue)
        authEndpoint: `http://127.0.0.1:8000/broadcasting/auth`,
        auth: {
            headers: {
                // Pull your token from where you store it (localStorage/Cookie)
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                Accept: 'application/json',
            },
        },
    })
    : null;