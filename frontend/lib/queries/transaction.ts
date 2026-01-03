// lib/queries/transactions.ts (or wherever you have it)
import { ResponseGet } from "@/types/common-request.type";

interface GetTransactionDTO {
    id: string;
    account_id: string;
    category_id: string;
    amount: number;
    type: string;
    description: string;
    transaction_date: string;
    created_at: string;
    updated_at: string;
    account: {
        id: string;
        user_id: string;
        name: string;
        type: string;
        balance: number;
        currency: string;
        created_at: string;
        user: {
            id: string;
            email: string;
            name: string;
            created_at: string;
            updated_at: string;
        };
    };
    category: {
        id: string;
        name: string;
        type: string;
        created_at: string;
    };
}

export interface ResponseGetTransactionDTO extends ResponseGet<GetTransactionDTO> { }

export async function getTransactions(
    take: number = 10,
    offset: number = 0
): Promise<ResponseGetTransactionDTO> {
    const res = await fetch(`/api/transaction?take=${take}&offset=${offset}`);

    if (!res.ok) {
        throw new Error('Failed to fetch transactions');
    }

    return res.json();
}