import { z } from "zod";

export const categorySchema = z.object({
    categoryName: z.string().min(1,"Category name is required").max(20,"Category name must be at most 20 characters"),
    categoryColor: z.string().min(1,"Category color is required").max(7,"Category color must be a valid hex code"),
    createdBy: z.string().min(1,"Created by is required")
})
