import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = 'http://localhost:3030/api/tasks';

//types

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
interface createTaskPayload{
    name:string;
    description?:string;
    priority:TaskPriority;
    status:TaskStatus;
    dueDate:string;
    category?:string;
    createdBy:string;
}

//payload for updating a task
interface UpdateTaskPayload{
    name?:string;
    description?:string;
    priority?:TaskPriority;
    status?:TaskStatus;
    dueDate?:string;
    category?:string;
    createdBy?:string;
}
//types


//Api functions
const createTaskAPI = async (formData:TaskFormData):Promise<Task> => {
    const payload:createTaskPayload={
        name:formData.taskName,
        description:formData.description,
        priority:formData.priority,
        status:formData.status,
        dueDate:formData.dueDate,
        category:formData.category,
        createdBy:formData.createdBy
    }
    const { data } = await axios.post<Task>(API_BASE_URL,payload);
    return data;
}

const getTasksAPI = async(username:string):Promise<Task[]> => {
    const { data } = await axios.get<Task[]>(`${API_BASE_URL}/${username}`);
    return data;
}

const getTaskByIdAPI = async(id:string):Promise<Task> => {
    const { data } = await axios.get(`${API_BASE_URL}/${id}`);
    return data;
}

const updateTaskAPI = async(params: { id: string, payload: UpdateTaskPayload}):Promise<Task> => {
    const { data } = await axios.put<Task>(`${API_BASE_URL}/${params.id}`,params.payload);
    return data;
}

const deleteTaskAPI = async(id:string):Promise<{ message: string; deleted: Task}> => {
    const { data } = await axios.delete<{ message: string; deleted: Task }>(`${API_BASE_URL}/${id}`);
    return data;
}
//API functions

//Tanstack Query hooks
export const useCreateTask = () =>{
    const queryClient = useQueryClient();
    return useMutation<Task, Error, TaskFormData>({
        mutationFn:createTaskAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']})
        },
    });
}

export const useGetTasks = (username:string) => {
    return useQuery<Task[],Error>({
        queryKey:['tasks',username],
        queryFn:() => getTasksAPI(username),
    });
}

export const useGetTaskById = (id:string|undefined) => {
    return useQuery<Task,Error>({
        queryKey:['tasks',id],
        queryFn: () => getTaskByIdAPI(id!),
        enabled:!!id,
    });
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<Task,Error, {id: string; payload: UpdateTaskPayload}>({
        mutationFn:updateTaskAPI,
        onSuccess: (_data,variables) => {
            queryClient.invalidateQueries({queryKey:['tasks']});
            queryClient.invalidateQueries({queryKey:['tasks', variables.id]})
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<{message:string;deleted:Task}, Error, string>({
        mutationFn:deleteTaskAPI,
        onSuccess:(_data,variables) => {
            queryClient.invalidateQueries({queryKey:['tasks']});
            queryClient.removeQueries({queryKey:['tasks',variables]})
        },
    })
}