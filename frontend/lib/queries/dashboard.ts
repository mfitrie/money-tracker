// lib/queries/transactions.ts (or wherever you have it)
import { ResponseGet } from "@/types/common-request.type";
import { CreateTransactionDTO } from "@/validation/transaction";

export interface GetTodaysExpenseDTO {
    data: number,
    categories: {
        name: string,
        color: string,
        total: number
    }[],
}



export async function getTodaysExpense(): Promise<GetTodaysExpenseDTO> {
    const res = await fetch('/api/dashboard/todaysspend');
    if (!res.ok) {
        throw new Error("Failed to fetch today's expense");
    }
    return res.json();
}