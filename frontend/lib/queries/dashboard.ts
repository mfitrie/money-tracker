import z from "zod";

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

export const GetRangeDateSpendSchema = z.object({
    date_from: z.string(),
    date_to: z.string(),
});
export type GetRangeDateSpendDTO = z.infer<typeof GetRangeDateSpendSchema>;


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

export async function getRangeDateSpend(payload: GetRangeDateSpendDTO): Promise<GetCurrentWeekSpendDTO[]> {
    const params = new URLSearchParams({
        date_from: payload.date_from,
        date_to: payload.date_to,
    });

    const res = await fetch(`/api/dashboard/rangedatespend?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Failed to fetch range date spend");
    }

    return res.json();
}