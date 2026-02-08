import { z } from "zod";

export const CreateTransactionDTOSchema = z.object({
    account_id: z.string({
        error: "Required"
    }).uuid(),
    category_id: z.string({
        error: "Required"
    }),
    amount: z.number({
        error: "Required"
    }),
    type: z.enum(["expense", "income"], {
        error: "Required"
    }),
    description: z.string().optional(),
    transaction_date: z.string().datetime().optional()
});

export type CreateTransactionDTO = z.infer<typeof CreateTransactionDTOSchema>;