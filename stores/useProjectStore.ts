// stores/useProjectStore.ts
import { Project } from "@/app/project/interface/Project";
import { create } from "zustand";

type UpdatePayload =
  | {
      title?: string;
      description?: string;
      image?: File | null;
    }
  | FormData; // Add FormData as a possible type

interface ProjectState {
  open: boolean;
  selectedProject: Project | null;
  openModal: (Project: Project) => void;
  closeModal: () => void;
  Projects: Project[];
  setProjects: (items: Project[]) => void;
  updateProject: (id: number, payload: UpdatePayload) => Promise<Project>; // Update parameter type
  deleteProject: (id: number) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export const useProjectStore = create<ProjectState>((set) => ({
  open: false,
  selectedProject: null,
  openModal: (Project) => set({ open: true, selectedProject: Project }),
  closeModal: () => set({ open: false, selectedProject: null }),
  Projects: [],
  loading: false,
  error: null,
  setProjects: (items) => set({ Projects: items }),
  updateProject: async (id, payload) => {
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

      const res = await fetch(`/api/Projects/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const updated: Project = await res.json();
      set((state) => ({
        Projects: state.Projects.map((b) => (b.id === id ? updated : b)),
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
  deleteProject: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/Projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        Projects: state.Projects.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
