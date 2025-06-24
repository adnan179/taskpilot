//budget.schema.ts
import { z } from "zod";

export const BudgetSchema = z.object({
    name:z.string().min(1,"Budget name is required"),
    createdBy:z.string().min(1,"Username is required"),
    categories: z.array(z.object({
        name:z.string().min(1,"Category name is required"),
        amount:z.number().min(1,"Category amount is required")
    })).min(1,"At least one category is required")
});

export type BudgetInput = z.infer<typeof BudgetSchema>;

