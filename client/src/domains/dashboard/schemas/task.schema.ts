import { z } from "zod";

export const taskSchema = z.object({
    taskName: z.string().min(1, "Task name is required").max(20, "Task name can't be more than 20 characters"),
    description: z.string().max(1000, "Description can't be more than 1000 characters").optional(),
    priority: z.enum(["low", "medium", "high"], { required_error: "Priority is required" }),
    status: z.enum(["todo", "in-progress", "completed"], { required_error: "Status is required" }),
    dueDate: z.string().optional(),
    category: z.string().optional(),
    createdBy: z.string().min(1, "Created by is required")
});
