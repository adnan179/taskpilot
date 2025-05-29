import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(1,"username is required"),
    password:z.string().min(6,"password should be 6 characters long!")
});

export type registerFormValues = z.infer<typeof registerSchema>;