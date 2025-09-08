// stores/useBlogStore.ts
import { Blog } from "@/app/blog/interface/Blog";
import { create } from "zustand";

type UpdatePayload =
  | {
      title?: string;
      description?: string;
      image?: File | null;
    }
  | FormData; // Add FormData as a possible type

interface BlogState {
  open: boolean;
  selectedBlog: Blog | null;
  openModal: (blog: Blog) => void;
  closeModal: () => void;
  blogs: Blog[];
  setBlogs: (items: Blog[]) => void;
  updateBlog: (id: number, payload: UpdatePayload) => Promise<Blog>; // Update parameter type
  deleteBlog: (id: number) => Promise<void>
  loading: boolean;
  error?: string | null;
}

export const useBlogStore = create<BlogState>((set) => ({
  open: false,
  selectedBlog: null,
  openModal: (blog) => set({ open: true, selectedBlog: blog }),
  closeModal: () => set({ open: false, selectedBlog: null }),
  blogs: [],
  loading: false,
  error: null,
  setBlogs: (items) => set({ blogs: items }),
  updateBlog: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      let body: BodyInit;
      const headers: HeadersInit = {};

      // Check if payload is FormData
      if (payload instanceof FormData) {
        body = payload;
      } else {
        body = JSON.stringify(payload);
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const updated: Blog = await res.json();
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? updated : b)),
        loading: false,
      }));
      return updated;
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ loading: false, error: err.message ?? "Update failed" });
      } else {
        set({ loading: false, error: "An unknown error occurred" });
      }
      throw err;
    }
  },
  deleteBlog: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
