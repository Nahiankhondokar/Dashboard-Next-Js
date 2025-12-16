// stores/useserviceStore.ts
import { Service } from "@/app/(dashboard)/dashboard/service/interface/Service";
import { create } from "zustand";

type UpdatePayload =
  | {
      title?: string;
      description?: string;
      image?: File | null;
    }
  | FormData; // Add FormData as a possible type

interface serviceState {
  open: boolean;
  selectedservice: Service | null;
  openModal: (service: Service) => void;
  closeModal: () => void;
  services: Service[];
  setservices: (items: Service[]) => void;
  updateService: (id: number, payload: UpdatePayload) => Promise<Service>; // Update parameter type
  deleteService: (id: number) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export const useServiceStore = create<serviceState>((set) => ({
  open: false,
  selectedservice: null,
  openModal: (service) => set({ open: true, selectedservice: service }),
  closeModal: () => set({ open: false, selectedservice: null }),
  services: [],
  loading: false,
  error: null,
  setservices: (items) => set({ services: items }),
  updateService: async (id, payload) => {
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

      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const updated: Service = await res.json();
      set((state) => ({
        services: state.services.map((b) => (b.id === id ? updated : b)),
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
  deleteService: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      set((state) => ({
        services: state.services.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
