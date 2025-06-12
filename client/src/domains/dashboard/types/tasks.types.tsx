export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task{
    _id:string;
    name:string;
    description?:string;
    priority:TaskPriority;
    status:TaskStatus;
    dueDate:string;
    category?:string;
    createdBy:string;
}

//input type for the form data
export interface TaskFormData{
    taskName:string;
    description?:string;
    priority:TaskPriority;
    status:TaskStatus;
    dueDate:string;
    category?:string;
    createdBy:string;
}

//payload for creating a task
export interface createTaskPayload{
    name:string;
    description?:string;
    priority:TaskPriority;
    status:TaskStatus;
    dueDate:string;
    category?:string;
    createdBy:string;
}

//payload for updating a task
export interface UpdateTaskPayload{
    name?:string;
    description?:string;
    priority?:TaskPriority;
    status?:TaskStatus;
    dueDate?:string;
    category?:string;
    createdBy?:string;
}