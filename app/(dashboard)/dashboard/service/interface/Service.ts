
export interface Service {
  id: number;
  title: string;
  sub_title: string;
  description?: string;
  project_link? : string;
  media?: string | null;
  status?: boolean; // 0 or 1
  created_at?: string
}

//
// "id": 1,
//     "title": "test",
//     "sub_title": "test",
//     "description": "test desc",
//     "media": null,
//     "status": true,
//     "created_at": "2026-01-31T13:11:32.000000Z"