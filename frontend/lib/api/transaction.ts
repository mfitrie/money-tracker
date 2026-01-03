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
};

export interface ResponseGetTransactionDTO extends ResponseGet<GetTransactionDTO> {
    // data: T;
    // message?: string;
    // success?: boolean;
}

export async function getTransactions() {
    //TODO: use URL
    const res = await fetch('http://localhost:8080/transaction?take=1&offset=0');
    if (!res.ok) throw new Error('Failed to fetch transactions')
    return res.json()
}

// export async function getPost(id: string) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//     if (!res.ok) throw new Error('Failed to fetch post')
//     return res.json()
// }