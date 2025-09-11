export interface Pagination {
    current_page: number;
    last_page: number;
      from: number;
      to: number;
      per_page: number;
      total: number
}
export interface Links {
    prev: string | null;
    next: string | null;
}
export interface Meta {
    search?: string|null
}  
export interface PaddingValues {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }

   export type PaginationLinksType = {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  export type PaginationMetaType = {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string; label: string; active: boolean }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };

    export interface PaginationType {
    // current_page: number;
    // data: any;
    //   first_page_url: string;
    //   from: number;
    //   last_page: number;
    //   last_page_url: string;
    //   links: { url: string; label: string; active: boolean }[];
    //   next_page_url: string;
    //   path: string;
    //   per_page: number;
    //   prev_page_url: string;
    //   to: number;
    //   total: number;
    links: PaginationLinksType;
    meta: PaginationMetaType;
  }
