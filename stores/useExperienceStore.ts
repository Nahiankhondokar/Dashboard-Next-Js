// stores/useExperienceStore.ts
import { Experience } from "@/app/(dashboard)/dashboard/experience/interface/Experience";
import { create } from "zustand";

type UpdatePayload =
  | {
      title?: string;
      description?: string;
      image?: File | null;
    }
  | FormData; // Add FormData as a possible type

interface ExperienceState {
  selectedExperience: Experience | null;
  Experiences: Experience[];
  setExperiences: (items: Experience[]) => void;
  fetchExperience: () => Promise<Experience>;
  updateExperience: (id: number, payload: UpdatePayload) => Promise<Experience>; // Update parameter type
  deleteExperience: (id: number) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  selectedExperience: null,
  Experiences: [],
  loading: false,
  error: null,
  setExperiences: (items) => set({ Experiences: items }),
  fetchExperience: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/Experiences`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        Experiences: res.data,
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
  updateExperience: async (id, payload) => {
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

      const res = await fetch(`/api/Experiences/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const updated: Experience = await res.json();
      set((state) => ({
        Experiences: state.Experiences.map((b) => (b.id === id ? updated : b)),
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
  deleteExperience: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/Experiences/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        Experiences: state.Experiences.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
