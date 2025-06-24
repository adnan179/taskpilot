//expenseBook.schema.ts
import { z } from "zod";

export const ExpenseBookSchema = z.object({
    name: z.string().min(1,"Expense book name is required"),
    createdBy: z.string().min(1,"username is required for creating expense book"),
    transactions: z.array(z.string().min(1,"Transaction id is required")),
    totalAmount: z.number().min(1,"Total amount is required"),
    budgetId:z.string().min(1,"Budget id is required")
});

export type ExpenseBookInput = z.infer<typeof ExpenseBookSchema>;
