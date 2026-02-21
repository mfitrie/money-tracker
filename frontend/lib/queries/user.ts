// lib/queries/transactions.ts (or wherever you have it)
import { ResponseGet } from "@/types/common-request.type";

interface GetUserDTO {
    username: string,
}
export interface ResponseGetUserData {
    name: string,
    email: string
}

export async function getUserData(
    {
        username
    }: GetUserDTO
): Promise<ResponseGetUserData> {
    const res = await fetch(`/api/user/${username}`);
    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }
    return res.json();
}