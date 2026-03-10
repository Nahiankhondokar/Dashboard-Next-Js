// stores/auth.ts
import { create } from "zustand";
import { User } from '@/type/user';

type AuthState = {
    user: User | null;
    token: string | null;
    setUser: (u: User | null) => void;
    setToken: (t: string | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
}));

export default useAuthStore;