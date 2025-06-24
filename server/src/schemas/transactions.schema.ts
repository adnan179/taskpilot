//transactions.schema.ts
import { z } from "zod";

export const TransactionSchema = z.object({
    name: z.string().min(1,"Transaction name is required"),
    description: z.string().optional(),
    amount: z.number().min(1,"Transaction amount is required"),
    category:z.string().min(1,"Category id is required"),
    type:z.enum(["income","expense"]),
    createdBy:z.string().min(1,"Username is required")
});

export type TransactionType = z.infer<typeof TransactionSchema>;
