import { PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from "@dnd-kit/core";
import { useTaskStore } from "@/modules/Tasks/store/useTaskStore";
import { useUpdateTask } from "./useTaskMutations";
import { COLUMNS } from "@/modules/Tasks/constants/columns";
import type { Task, ColumnId } from "@/modules/Tasks/types/task.types";

interface UseDragAndDropReturn {
  sensors: ReturnType<typeof useSensors>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export function useDragAndDrop(tasks: Task[]): UseDragAndDropReturn {
  const setActiveTaskId = useTaskStore((s) => s.setActiveTaskId);
  const { mutate: updateTask } = useUpdateTask();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = ({ active }: DragStartEvent): void => {
    setActiveTaskId(active.id as number);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    setActiveTaskId(null);
    if (!over) return;

    const dragged = tasks.find((t) => t.id === active.id);
    if (!dragged) return;

    const overColumn = COLUMNS.find((c) => c.id === over.id);
    const overTask = tasks.find((t) => t.id === over.id);
    const targetCol = (overColumn?.id ?? overTask?.column) as ColumnId | undefined;

    if (targetCol && dragged.column !== targetCol) {
      updateTask({ id: dragged.id, column: targetCol });
    }
  };

  return { sensors, handleDragStart, handleDragEnd };
}
