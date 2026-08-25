import { ResponseGet } from "@/types/common-request.type";
import { CreateTransactionDTO } from "@/validation/transaction";

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
        let message = `Request failed with status ${res.status}`;

        try {
            const errorBody = await res.json();
            message = errorBody.message ?? message;
        } catch {
            // response wasn't JSON, fall back to default message
        }

        const error = new Error(message) as Error & { status?: number };
        error.status = res.status;
        throw error;
    }

    return res.json();
}


export async function createTransaction(
    payload: CreateTransactionDTO
): Promise<any> {
    const res = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create transaction');
    }

    return res.json();
}


export async function deleteTransaction(id: string): Promise<void> {
    const res = await fetch(`/api/transaction/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete transaction');
    }

    // 204 No Content — nothing to parse
}