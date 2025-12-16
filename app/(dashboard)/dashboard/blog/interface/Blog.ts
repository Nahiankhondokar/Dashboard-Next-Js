"use client";
export interface Blog {
  id: number;
  title: string;
  description?: string;
  image?: string | null;
//   status?: number; // 0 or 1
  // add any fields your app uses
}