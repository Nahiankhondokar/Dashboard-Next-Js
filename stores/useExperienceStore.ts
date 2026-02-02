// stores/useExperienceStore.ts
import {ApiResponse, Experience} from "@/app/(dashboard)/dashboard/experience/interface/Experience";
import { create } from "zustand";
import {apiFetch} from "@/lib/api";
import {PaginationResponse} from "@/type/pagination/PaginationType";

type Mode = "create" | "edit";

interface ExperienceState {
  selectedExperience: Experience | null;
  experiences: Experience[];
  pagination: PaginationResponse<Experience>["meta"] | null;
  setExperiences: (items: Experience[]) => void;

  fetchExperiences: (page?: number) => Promise<void>;
  createExperience: (data: FormData) => Promise<Experience>;
  updateExperience: (id: number, data: FormData) => Promise<void>;
  deleteExperience: (id: number) => Promise<void>

  loading: boolean;
  error?: string | null;

  // modal
  modalOpen: boolean;
  mode: Mode;

  // actions
  openCreateModal: () => void;
  openEditModal: (exp: Experience) => void;
  closeModal: () => void;
}

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  selectedExperience: null,
  experiences: [],
  setExperiences: (items) => set({ experiences: items }),

  pagination: null,
  modalOpen: false,
  mode: "create",

  loading: false,
  error: null,

  openCreateModal: () =>
      set({
        modalOpen: true,
        mode: "create",
        selectedExperience: null,
      }),

  openEditModal: (exp: Experience) => {
    set({
      modalOpen: true,
      mode: "edit",
      selectedExperience: exp,
    });
    console.log("openEditModal called with:", get().selectedExperience);
  },

  closeModal: () =>
      set({
        modalOpen: false,
        selectedExperience: null,
        error: null,
      }),

  fetchExperiences: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {

      const res = await apiFetch<PaginationResponse<Experience>>(
          `experiences?page=${page}&limit=${limit}`
      );

      set({
        experiences: res.data,
        pagination: res.meta,
        loading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
  createExperience: async (data: FormData) => {
    set({ loading: true, error: null});

    try {
      const res = await apiFetch<ApiResponse<Experience>>("experiences",{
        method : "POST",
        body: data
      });

      set((state) => ({
        experiences: [res.data, ...state.experiences],
        loading: false,
        modalOpen: false,          // 🔥 close modal
        selectedExperience: null,  // 🔥 reset
      }));

      return res.data;
    }catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
  updateExperience: async (id, data) => {
    set({ loading: true });

    const res = await apiFetch<{ data: Experience }>(
        `experiences/${id}`,
        {
          method: "PUT", // or PUT with _method
          body: data,
        }
    );

    await get().fetchExperiences();
    set((state) => ({
      loading: false,
      modalOpen: false,          // 🔥 close modal
      selectedExperience: null,  // 🔥 reset
    }));
  },
  deleteExperience: async (id: number) => {
    set({ loading: true, error: null });

    try {
      await apiFetch(`experiences/${id}`, {
        method: "DELETE",
      });

      // ✅ Remove from store instantly
      set((state) => ({
        experiences: state.experiences.filter((exp) => exp.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({
        loading: false,
        error: err.message ?? "Delete failed",
      });
      throw err;
    }
  },

}));



// updateExperience: (id: number, payload: UpdatePayload) => Promise<Experience>; // Update parameter type
// deleteExperience: (id: number) => Promise<void>;

// updateExperience: async (id, payload) => {
//   set({ loading: true, error: null });
//   try {
//     let body: BodyInit;
//     const headers: HeadersInit = {};
//
//     // Check if payload is FormData
//     if (payload instanceof FormData) {
//       body = payload;
//     } else {
//       body = JSON.stringify(payload);
//       headers["Content-Type"] = "application/json";
//     }
//
//     const res = await fetch(`/api/Experiences/${id}`, {
//       method: "PUT",
//       headers,
//       body,
//     });
//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(text || `HTTP ${res.status}`);
//     }
//     const updated: Experience = await res.json();
//     set((state) => ({
//       Experiences: state.Experiences.map((b) => (b.id === id ? updated : b)),
//       loading: false,
//     }));
//     return updated;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       set({ loading: false, error: err.message ?? "Update failed" });
//     } else {
//       set({ loading: false, error: "An unknown error occurred" });
//     }
//     throw err;
//   }
// },
// deleteExperience: async (id: number) => {
//   set({ loading: true, error: null });
//   try {
//     const res = await fetch(`/api/Experiences/${id}`, {
//       method: "DELETE",
//     });
//
//     if (!res.ok) {
//       throw new Error(`Failed with status ${res.status}`);
//     }
//
//     set((state) => ({
//       Experiences: state.Experiences.filter((b) => b.id !== id),
//       loading: false,
//     }));
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : "Unknown error";
//     set({ loading: false, error: message });
//     throw err;
//   }
// },


// ToDo: exerience table dynamci data render
// ToDo: Data render from store
// ToDo: Pagination componenet added for each table.

