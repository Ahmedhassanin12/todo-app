"use client";
import { createPortal } from "react-dom";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { AppHeader } from "@/components/ui/AppHeader";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "@/components/task/TaskCard";
import { TaskModal } from "@/components/task/TaskModal";
import { useTasks } from "@/modules/Tasks/hooks/useTasks";
import { useDragAndDrop } from "@/modules/Tasks/hooks/useDragAndDrop";
import { useTaskStore } from "@/modules/Tasks/store/useTaskStore";
import { COLUMNS, COLUMN_MAP } from "@/modules/Tasks/constants/columns";
import { filterTasks, getColumnTasks } from "@/modules/Tasks/utils/filterTasks";

export function KanbanBoard() {
  const { data: tasks = [] } = useTasks();

  const search = useTaskStore((s) => s.search);
  const activeTaskId = useTaskStore((s) => s.activeTaskId);

  const { sensors, handleDragStart, handleDragEnd } = useDragAndDrop(tasks);

  const filteredTasks = filterTasks(tasks, search);
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const activeCol = activeTask ? COLUMN_MAP[activeTask.column] : undefined;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppHeader totalCount={tasks.length} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            p: { xs: 2, md: 3 },
            alignItems: "start",
          }}
        >
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              col={col}
              tasks={getColumnTasks(filteredTasks, col.id)}
            />
          ))}
        </Box>

        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} col={activeCol} overlay />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <TaskModal />
    </Box>
  );
}
