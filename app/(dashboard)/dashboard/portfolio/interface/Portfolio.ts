
export interface Portfolio {
  id: number;
  title: string;
  sub_title: string;
  description?: string;
  project_link? : string;
  media?: string | null;
  status?: boolean; // 0 or 1
  created_at?: string
}
