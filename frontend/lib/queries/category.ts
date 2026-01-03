// lib/queries/transactions.ts (or wherever you have it)
import { ResponseGet } from "@/types/common-request.type";

interface GetCategoryDTO {
    id: string,
    name: string,
    type: "expense" | "income",
    color: string,
    created_at: string
}

export interface ResponseGetCategoryDTO extends ResponseGet<GetCategoryDTO> { }

export async function getCatogories(
    take: number = 10,
    offset: number = 0
): Promise<ResponseGetCategoryDTO> {
    const res = await fetch(`/api/category?take=${take}&offset=${offset}`);

    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }

    return res.json();
}