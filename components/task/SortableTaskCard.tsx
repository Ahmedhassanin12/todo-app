import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { TaskCard } from "./TaskCard";
import type { Task, Column } from "@/modules/Tasks/types/task.types";

interface SortableTaskCardProps {
  task: Task;
  col: Column;
  onEdit: () => void;
  onDelete: () => void;
}

export function SortableTaskCard({ task, col, onEdit, onDelete }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} col={col} onEdit={onEdit} onDelete={onDelete} />
    </Box>
  );
}
