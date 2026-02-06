// stores/useProjectStore.ts
import { Project } from "@/app/(dashboard)/dashboard/project/interface/Project";
import { create } from "zustand";
import {apiFetch} from "@/lib/api";
import {ApiResponse} from "@/type/api-response";
import {Service} from "@/app/(dashboard)/dashboard/service/interface/Service";

type UpdatePayload =
  | {
      title?: string;
      description?: string;
      image?: File | null;
    }
  | FormData; // Add FormData as a possible type

type Mode = "create" | "edit";

interface ProjectState {
  open: boolean;
  selectedProject: Project | null;
  openModal: (Project: Project) => void;
  closeModal: () => void;
  projects: Project[];
  setProjects: (items: Project[]) => void;
  updateProject: (id: number, payload: UpdatePayload) => Promise<Project>; // Update parameter type
  deleteProject: (id: number) => Promise<void>;
  createProject: (data: FormData) => Promise<Project>
  loading: boolean;
  error?: string | null;
  mode : Mode
}

export const useProjectStore = create<ProjectState>((set) => ({
  open: false,
  mode : 'create',
  selectedProject: null,
  openModal: (Project) => set({ open: true, selectedProject: Project }),
  closeModal: () => set({ open: false, selectedProject: null }),
  projects: [],
  loading: false,
  error: null,
  setProjects: (items) => set({ projects: items }),
  createProject: async (data: FormData) => {
    set({loading: true, error: null});
    try {
      const res = await apiFetch<ApiResponse<Service>>('projects',{
        method : "POST",
        body : data
      })

      set((state)=> ({
        loading: false,
        projects: [res.data, ...state.projects],
        modalOpen: false,          // 🔥 close modal
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

      const res = await fetch(`/api/projects/${id}`, {
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
        projects: state.projects.map((b) => (b.id === id ? updated : b)),
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
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        projects: state.projects.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
