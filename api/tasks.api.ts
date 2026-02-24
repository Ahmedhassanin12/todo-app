import type { Task, CreateTaskPayload, UpdateTaskPayload } from "@/modules/Tasks/types/task.types";
import axiosInstance from "./axios";

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await axiosInstance.get<Task[]>("/tasks");
    return data;
  },

  create: async (payload: CreateTaskPayload): Promise<Task> => {
    const { data } = await axiosInstance.post<Task>("/tasks", payload);
    return data;
  },

  update: async ({ id, ...payload }: UpdateTaskPayload): Promise<Task> => {
    const { data } = await axiosInstance.patch<Task>(`/tasks/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
  },
};
