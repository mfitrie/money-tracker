// lib/queries/transactions.ts (or wherever you have it)
import { ResponseGet } from "@/types/common-request.type";

interface GetCategoryDTO {
    type: "income" | "expense",
    take: number,
    offset: number,
}
interface ResponseGetCategoryData {
    id: string,
    name: string,
    type: "expense" | "income",
    color: string,
    created_at: string
}

export interface ResponseGetCategoryDTO extends ResponseGet<ResponseGetCategoryData> { }

export async function getCatogories(
    {
        take = 10,
        offset = 0,
        type,
    }: GetCategoryDTO
): Promise<ResponseGetCategoryDTO> {
    const params = new URLSearchParams({
        take: take.toString(),
        offset: offset.toString(),
    });

    if (type) {
        params.append('type', type);
    }

    const res = await fetch(`/api/category?${params.toString()}`);
    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }
    return res.json();
}