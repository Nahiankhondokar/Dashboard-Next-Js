"use client";

import { create } from "zustand";
import {mockUsers} from "@/app/(dashboard)/dashboard/user/mockUsers/mockUsers";
import { User } from "@/app/(dashboard)/dashboard/user/type/user";
import {apiFetch} from "@/lib/api";
import {PaginationResponse} from "@/type/pagination/PaginationType";
import {Service} from "@/app/(dashboard)/dashboard/service/interface/Service";


interface UserState {
  users: User[];
  selectedUser: User | null,
  loading: boolean,
  error?: string | null,
  pagination: PaginationResponse<User>["meta"] | null;
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  createUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  detailsUser: (id: number) => Promise<User | undefined>;

  // actions
  openCreateModal: () => void;
  openEditModal: (user : User) => void;
  closeModal: () => void;
  modalOpen: boolean,
  mode: string,

}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  pagination: null,
  modalOpen: false,
  mode: "create",

  // actions
  openCreateModal: () =>
      set({
        modalOpen: true,
        mode: "create",
        selectedUser: null,
      }),
  openEditModal: (user: User) => {
    set({
          modalOpen: true,
          mode: "edit",
          selectedUser: user,
        });
  },
  closeModal: () =>
      set({
        modalOpen: false,
        selectedUser: null,
        error: null,
      }),

  // Fetch all users
  fetchUsers: async (page = 1) => {
    try {
      const res = await apiFetch<PaginationResponse<User>>(`users?page=${page}`);

      return set({
        users: res.data,
        pagination: res.meta
      });
      
    } catch (err) {
      console.error("Fetch users failed", err);
    }
  },

  // Create a new user
  createUser: async (user) => {
    try {
      // const res = await fetch("/api/users", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(user),
      // });
      // if (!res.ok) throw new Error("Failed to create user");
      // const newUser: User = await res.json();

      // set((state) => ({
      //   allData: [...state.allData, newUser],
      // }));

      // ✅ Optional: show success toast or reset form
    } catch (err) {
      console.error("Create user failed", err);
    }
  },

  // Update existing user
  updateUser: async (updatedUser) => {
    // try {
    //   const res = await fetch(`/api/users/${updatedUser.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updatedUser),
    //   });
    //   if (!res.ok) throw new Error("Failed to update user");
    //
    //   set((state) => ({
    //     Users: state.Users.map((u) =>
    //       u.id === updatedUser.id ? updatedUser : u
    //     ),
    //   }));
    // } catch (err) {
    //   console.error("Update user failed", err);
    // }
  },

  // Delete user
  deleteUser: async (id) => {
    // try {
    //   const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    //   if (!res.ok) throw new Error("Failed to delete user");
    //
    //   set((state) => ({
    //     Users: state.Users.filter((u) => u.id !== id),
    //   }));
    // } catch (err) {
    //   console.error("Delete failed", err);
    // }
  },

  // Get user details
  detailsUser: async (id): Promise<User | undefined> => {
    try {
      // const res = await fetch(`/api/users/${id}`);
      // if (!res.ok) throw new Error("Failed to fetch user details");

      // const user: User = await res.json();
      // return user;

      return mockUsers.find((user) => user.id === id);
    } catch (err) {
      console.error("Fetch user details failed", err);
    }
  }
}));
