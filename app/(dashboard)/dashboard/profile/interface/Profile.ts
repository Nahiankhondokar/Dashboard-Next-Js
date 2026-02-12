
export interface Profile {
  id: number;
  name: string;
  description?: string;
  progress: string | null;
  status?: boolean | null;
}