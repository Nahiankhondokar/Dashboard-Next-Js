
import { create } from "zustand";
import {apiFetch} from "@/lib/api";
import {PaginationResponse} from "@/type/pagination/PaginationType";
import {ApiResponse} from "@/type/api-response";
import {Blog} from "@/app/(dashboard)/dashboard/blog/interface/Blog";

type Mode = "create" | "edit";

interface BlogState {
  selectedBlog: Blog | null;
  blogs: Blog[];
  setBlogs: (items: Blog[]) => void;
  loading: boolean;
  error?: string | null;
  pagination: PaginationResponse<Blog>["meta"] | null;

  // actions
  openCreateModal: () => void;
  openEditModal: (blog: Blog) => void;
  closeModal: () => void;

  // Modals details
  mode: Mode,
  modalOpen : boolean

  // Methods
  fetchBlog: (page?: number, limit?: number) => Promise<void>;
  createBlog: (data: FormData) => Promise<Blog>
  updateBlog: (id: number, data: FormData) => Promise<void>
  deleteBlog: (id: number) => Promise<void>
}

export const useBlogStore = create<BlogState>((set, get) => ({
  selectedBlog: null,
  blogs: [],
  setBlogs: (items) => set({ blogs: items }),
  pagination: null,
  loading: false,
  error: null,

  modalOpen: false,
  mode: "create",

  openCreateModal: () =>
      set({
        modalOpen: true,
        mode: "create",
        selectedBlog: null,
      }),

  openEditModal: (blog: Blog) => {
    set({
      modalOpen: true,
      mode: "edit",
      selectedBlog: blog,
    });
    console.log("openEditModal called with:", get().selectedBlog);
  },

  closeModal: () =>
      set({
        modalOpen: false,
        selectedBlog: null,
        error: null,
      }),

  fetchBlog: async (page = 1, limit = 10) => {
    set({loading: true, error: null});
    try {
      const res = await apiFetch<PaginationResponse<Blog>>(
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
  },
  createBlog: async (data: FormData) => {
    set({loading: true, error: null});
    try {
      const res = await apiFetch<ApiResponse<Blog>>('blogs',{
        method : "POST",
        body : data
      })

      set((state)=> ({
        loading: false,
        blogs: [res.data, ...state.blogs],
        modalOpen: false,
      }));

      return res.data;
    }catch (err: unknown){
      if (err instanceof Error) {
        set({ loading: false, error: err.message ?? "Create failed" });
      } else {
        set({ loading: false, error: "An unknown error occurred" });
      }
      throw err;
    }
  },
  updateBlog: async (id: number, data: FormData) => {
    set({ loading: true });
    console.log("blog store")

    const res = await apiFetch<{ data: Blog }>(
        `blogs/${id}`,
        {
          method: "PUT",
          body: data,
        }
    );

    await get().fetchBlog();
    set((state) => ({
      loading: false,
      modalOpen: false,
      selectedBlog: null,
    }));
  },
  deleteBlog: async (id: number) => {
    set({ loading: true, error: null });

    try {
      await apiFetch(`blogs/${id}`, {
        method: "DELETE",
      });

      // ✅ Remove from store instantly
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({
        loading: false,
        error: err.message ?? "Delete failed",
      });
      throw err;
    }
  }
}));
