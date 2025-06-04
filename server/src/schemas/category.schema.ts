import { z } from "zod";

export const CategorySchema = z.object({
    name:z.string().min(1,'Category name is required'),
    color:z.string().min(1,'Color is required'),
    createdBy:z.string().min(1,"Username is required")
});

export type CategoryInput = z.infer<typeof CategorySchema>;
