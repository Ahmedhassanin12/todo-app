import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/api/tasks.api";
import { taskKeys } from "@/modules/Tasks/constants/query";
import type { CreateTaskPayload, UpdateTaskPayload } from "@/modules/Tasks/types/task.types";

function useInvalidateTasks() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: taskKeys.all });
}

export function useCreateTask() {
  const invalidate = useInvalidateTasks();
  return useMutation<unknown, Error, CreateTaskPayload>({
    mutationFn: tasksApi.create,
    onSuccess: invalidate,
  });
}

export function useUpdateTask() {
  const invalidate = useInvalidateTasks();
  return useMutation<unknown, Error, UpdateTaskPayload>({
    mutationFn: tasksApi.update,
    onSuccess: invalidate,
  });
}

export function useDeleteTask() {
  const invalidate = useInvalidateTasks();
  return useMutation<void, Error, number>({
    mutationFn: tasksApi.remove,
    onSuccess: invalidate,
  });
}
