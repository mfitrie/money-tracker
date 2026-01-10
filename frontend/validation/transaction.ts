import { z } from "zod";

export const CreateTransactionDTOSchema = z.object({
    account_id: z.string().uuid(),
    category_id: z.string(),
    amount: z.number(),
    type: z.enum(["expense", "income"]),
    description: z.string().optional()
});

export type CreateTransactionDTO = z.infer<typeof CreateTransactionDTOSchema>;