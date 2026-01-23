export interface Experience {
  id: number;
  title: string;
  description: string | null;
  duration: string | null;
  company: string | null;
  start_date: string | null;
  end_date: string | null;
  media: Record<string, unknown> | null;
}
export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: unknown;
}

// type UpdatePayload =
//     | {
//   title?: string;
//   description?: string;
//   image?: File | null;
// }
//     | FormData; // Add FormData as a possible type
