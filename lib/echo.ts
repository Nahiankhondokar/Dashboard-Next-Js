import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// This tells TypeScript that the 'window' object
// officially has a 'Pusher' property
declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

if (typeof window !== 'undefined') {
    window.Pusher = Pusher; // No more 'any' error!
}

export const echo = typeof window !== 'undefined'
    ? new Echo({
        broadcaster: 'pusher',
        // Do NOT pass client: Pusher here
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        // wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST || 'localhost',
        // wsPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT) || 8080,
        // forceTLS: process.env.NEXT_PUBLIC_PUSHER_SCHEME === 'https',
        forceTLS: true,
        // enabledTransports: ['ws', 'wss'],
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,

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