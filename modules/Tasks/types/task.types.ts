export type ColumnId = "backlog" | "in_progress" | "review" | "done";

export interface Task {
  id: number;
  title: string;
  description: string;
  column: ColumnId;
}

export interface Column {
  id: ColumnId;
  label: string;
  color: string;
  lightColor: string;
}

export type CreateTaskPayload = Omit<Task, "id">;

export type UpdateTaskPayload = Partial<Omit<Task, "id">> & { id: number };

export type ModalMode = "create" | "edit";

export interface ModalState {
  open: boolean;
  mode: ModalMode;
  taskId: number | null;
  column: ColumnId | null;
  title: string;
  description: string;
}
