export interface ResponseGet<T> {
    data: T[],
    pagination: {
        page: number,
        page_size: number,
        total: number,
        total_pages: number
    }
}