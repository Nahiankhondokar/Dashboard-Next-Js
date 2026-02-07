
export interface Project {
  id: number;
  title: string;
  project_link?: string;
  status?:boolean;
  description?: string;
  media?: string | null;
  created_at?: string | null;
}