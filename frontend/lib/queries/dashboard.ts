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

export interface GetAverageDailySpendDTO {
    data: number,
}

export interface GetCurrentWeekSpendDTO {
    day_date: string,
    day_name: string,
    total_amount: number | null
}


export async function getTodaysExpense(): Promise<GetTodaysExpenseDTO> {
    const res = await fetch('/api/dashboard/todaysspend');
    if (!res.ok) {
        throw new Error("Failed to fetch today's expense");
    }
    return res.json();
}

export async function getAverageDailySpend(): Promise<GetAverageDailySpendDTO> {
    const res = await fetch('/api/dashboard/averagedailyspend');
    if (!res.ok) {
        throw new Error("Failed to fetch average daily spend");
    }
    return res.json();
}

export async function getCurrentWeekSpend(): Promise<GetCurrentWeekSpendDTO[]> {
    const res = await fetch('/api/dashboard/currentweekspend');
    if (!res.ok) {
        throw new Error("Failed to fetch current week spend");
    }
    return res.json();
}