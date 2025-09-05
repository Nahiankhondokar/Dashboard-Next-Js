import { Blog } from "@/app/blog/interface/Blog";
import { create } from "zustand";

interface BlogModalState {
  open: boolean;
  selectedBlog: Blog | null;
  openModal: (blog: Blog) => void;
  closeModal: () => void;
}

export const useBlogModal = create<BlogModalState>((set) => ({
  open: false,
  selectedBlog: null,
  openModal: (blog) => set({ open: true, selectedBlog: blog }),
  closeModal: () => set({ open: false, selectedBlog: null }),
}));