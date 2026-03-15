
import { create } from "zustand";
import {apiFetch} from "@/lib/api";
import {PaginationResponse} from "@/type/pagination/PaginationType";
import {ApiResponse} from "@/type/api-response";
import {Blog} from "@/app/(dashboard)/dashboard/blog/interface/Blog";

export interface Overview {
    blogs: number;
    portfolios: number;
    services: number;
    projects: number;
}

interface BlogState {
    overview: Overview | null;
    loading: boolean;
    error?: string | null;

    // Methods
    fetchOverview: () => Promise<void>;
}

export const useDashboardStore = create<BlogState>((set, get) => ({
    overview: null,
    loading: false,
    error: null,

    fetchOverview: async () => {
        set({loading: true, error: null});
        try {
            const res = await apiFetch<ApiResponse<Overview>>(
                `dashboard/overview`
            );

            set({
                overview: res.data,
                loading: false,
            });
        }catch (err: unknown){
            if (err instanceof Error) {
                set({
                    loading: false,
                    error: err.message ?? "Fetching failed"
                });
            } else {
                set({ loading: false, error: "An unknown error occurred" });
            }
            throw err;
        }
    },
}));
