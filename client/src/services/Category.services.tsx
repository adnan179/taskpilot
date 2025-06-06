import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3030/api/categories';

// Types
export interface Category {
  _id: string;
  name: string;
  color: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Input type for the form data
export interface CategoryFormData {
  categoryName: string;
  categoryColor: string;
  createdBy: string;
}

// Payload for creating a category
interface CreateCategoryPayload {
  name: string;
  color: string;
  createdBy: string;
}

// Payload for updating a category
interface UpdateCategoryPayload {
  name?: string;
  color?: string;
  createdBy?: string; // it must be passed even if not changing, due to schema validation
}

// --- API Functions --- //

const createCategoryAPI = async (formData: CategoryFormData): Promise<Category> => {
  const payload: CreateCategoryPayload = {
    name: formData.categoryName,
    color: formData.categoryColor,
    createdBy: formData.createdBy,
  };
  const { data } = await axios.post<Category>(API_BASE_URL, payload);
  return data;
};

const getCategoriesAPI = async (username:string| undefined): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${API_BASE_URL}/${username}`);
  return data;
};

const getCategoryByIdAPI = async (id: string): Promise<Category> => {
  const { data } = await axios.get<Category>(`${API_BASE_URL}/${id}`);
  return data;
};

// The 'id' is part of the URL, 'payload' is the request body
const updateCategoryAPI = async (params: { id: string; payload: UpdateCategoryPayload }): Promise<Category> => {
  const { data } = await axios.put<Category>(`${API_BASE_URL}/${params.id}`, params.payload);
  return data;
};

const deleteCategoryAPI = async (id: string): Promise<{ message: string; deleted: Category }> => {
  const { data } = await axios.delete<{ message: string; deleted: Category }>(`${API_BASE_URL}/${id}`);
  return data;
};

//TanStack Query Hooks

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Category, Error, CategoryFormData>({
    mutationFn: createCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useGetCategories = (username:string|undefined) => {
  return useQuery<Category[], Error>({
    queryKey: ['categories',username],
    queryFn: () => getCategoriesAPI(username!),
  });
};

export const useGetCategoryById = (id: string | undefined) => {
  return useQuery<Category, Error>({
    queryKey: ['category', id],
    queryFn: () => getCategoryByIdAPI(id!),
    enabled: !!id,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Category, Error, { id: string; payload: UpdateCategoryPayload }>({
    mutationFn: updateCategoryAPI,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string; deleted: Category }, Error, string>({
    mutationFn: deleteCategoryAPI,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.removeQueries({ queryKey: ['category', variables] });
    },
  });
};