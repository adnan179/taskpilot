import { z } from "zod";

export const TaskSchema = z.object({
    name:z.string().min(1,"Task name is required"),
    description:z.string().optional(),
    priority:z.enum(['low','medium','high']),
    status:z.enum(['todo','inprogress','done']),
    dueDateTime:z.string().min(1,"Due date is required"),
    category: z.string().optional(),
    createdBy:z.string().min(1,"Username is required")
});

export type TaskInput = z.infer<typeof TaskSchema>;
