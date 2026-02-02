export interface ApiResponse<T> {
    data: T;
    message?: string;
    meta?: unknown;
}