import type { Task, ColumnId } from "@/modules/Tasks/types/task.types";

export function filterTasks(tasks: Task[], search: string): Task[] {
  if (!search.trim()) return tasks;
  const q = search.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  );
}

export function getColumnTasks(tasks: Task[], columnId: ColumnId): Task[] {
  return tasks.filter((t) => t.column === columnId);
}
