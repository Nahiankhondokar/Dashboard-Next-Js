// stores/useSkillStore.ts
import { Skill } from "@/app/skill/interface/Skill";
import { create } from "zustand";

type UpdatePayload =
  | {
      title?: string;
      description?: string;
      image?: File | null;
    }
  | FormData; // Add FormData as a possible type

interface SkillState {
  open: boolean;
  selectedSkill: Skill | null;
  openModal: (Skill: Skill) => void;
  closeModal: () => void;
  Skills: Skill[];
  setSkills: (items: Skill[]) => void;
  updateSkill: (id: number, payload: UpdatePayload) => Promise<Skill>; // Update parameter type
  deleteSkill: (id: number) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export const useSkillStore = create<SkillState>((set) => ({
  open: false,
  selectedSkill: null,
  openModal: (Skill) => set({ open: true, selectedSkill: Skill }),
  closeModal: () => set({ open: false, selectedSkill: null }),
  Skills: [],
  loading: false,
  error: null,
  setSkills: (items) => set({ Skills: items }),
  updateSkill: async (id, payload) => {
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

      const res = await fetch(`/api/Skills/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const updated: Skill = await res.json();
      set((state) => ({
        Skills: state.Skills.map((b) => (b.id === id ? updated : b)),
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
  deleteSkill: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/Skills/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        Skills: state.Skills.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
