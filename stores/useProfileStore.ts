
import { create } from "zustand";
import {apiFetch} from "@/lib/api";
import {PaginationResponse} from "@/type/pagination/PaginationType";
import {ApiResponse} from "@/type/api-response";
import {Blog} from "@/app/(dashboard)/dashboard/blog/interface/Blog";


interface BlogState {
    profile: Blog[];
    setProfile: (items: Blog[]) => void;
    loading: boolean;
    error?: string | null;

    // Methods
    fetchBlog: (page?: number, limit?: number) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
    profile: [],
    setProfile: (items) => set({ blogs: items }),
    loading: false,
    error: null,

    fetchBlog: async (page = 1, limit = 10) => {
        set({loading: true, error: null});
        try {
            const res = await apiFetch<ApiResponse<Blog>>(
                `blogs?page=${page}&limit=${limit}`
            );

            set({
                blogs: res.data,
                pagination: res.meta,
                loading: false,
            });
        }catch (err: unknown){
            if (err instanceof Error) {
                set({ loading: false, error: err.message ?? "Fetching failed" });
            } else {
                set({ loading: false, error: "An unknown error occurred" });
            }
            throw err;
        }
    }
}));
