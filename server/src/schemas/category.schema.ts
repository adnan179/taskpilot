import { z } from "zod";

export const CategorySchema = z.object({
    name:z.string().min(1,'Category name is required'),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
