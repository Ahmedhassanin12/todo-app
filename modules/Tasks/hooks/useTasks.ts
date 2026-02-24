import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "@/api/tasks.api";
import { taskKeys } from "@/modules/Tasks/constants/query";
import type { Task } from "@/modules/Tasks/types/task.types";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: taskKeys.all,
    queryFn: tasksApi.getAll,
  });
}
