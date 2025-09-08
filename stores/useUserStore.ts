"use client";

import React from 'react'
import { create } from 'zustand';

interface UserState {
    id: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    role: string;
    image: string;
    status: boolean;
    updateUser: (id: number, payload: UserState) => Promise<void>;
    deleteUser : (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>(set => ({
    id: '',
    name: '',
    email: '',
    username: '',
    phone: '',
    role: '',
    image: '',
    status: false,
    updateUser: async (id: number, payload: UserState) => {},
    deleteUser: async (id: number) => {},
}));