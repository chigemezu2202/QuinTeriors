export interface PaginationParams {
    page: number;
    limit: number;
}

export function parsePagination(query: Record<string, unknown>): PaginationParams {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    return {
        page: Number.isNaN(page) || page < 1 ? 1 : page,
        limit: Number.isNaN(limit) || limit < 1 ? 10 : limit,
    };
}
