import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { createTaskPayload, Task, TaskFormData, UpdateTaskPayload } from "../types/tasks.types";

const API_BASE_URL = 'http://localhost:3030/api/tasks';


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

const getTasksAPI = async(username:string | undefined):Promise<Task[]> => {
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

export const useGetTasks = (username:string | undefined) => {
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