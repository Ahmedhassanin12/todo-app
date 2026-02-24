import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Button,
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SortableTaskCard } from "@/components/task/SortableTaskCard";
import { EmptyColumn } from "@/components/ui/EmptyColumn";
import { PAGE_SIZE } from "@/modules/Tasks/constants/query";
import { useTaskStore } from "@/modules/Tasks/store/useTaskStore";
import { useDeleteTask } from "@/modules/Tasks/hooks/useTaskMutations";
import type { Column, Task } from "@/modules/Tasks/types/task.types";

interface KanbanColumnProps {
  col: Column;
  tasks: Task[];
}

export function KanbanColumn({ col, tasks }: KanbanColumnProps) {
  const page = useTaskStore((s) => s.pages[col.id]);
  const incrementPage = useTaskStore((s) => s.incrementPage);
  const openCreateModal = useTaskStore((s) => s.openCreateModal);
  const openEditModal = useTaskStore((s) => s.openEditModal);

  const { mutate: deleteTask } = useDeleteTask();
  const { setNodeRef } = useDroppable({ id: col.id });

  const paginated = tasks.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < tasks.length;

  return (
    <SortableContext
      id={col.id}
      items={[col.id, ...paginated.map((t) => t.id)]}
      strategy={verticalListSortingStrategy}
    >
      <Box
        ref={setNodeRef}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
            background: `linear-gradient(135deg, ${col.lightColor}, transparent)`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: col.color,
                boxShadow: `0 0 7px ${col.color}`,
              }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.67rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              {col.label}
            </Typography>
            <Chip
              label={tasks.length}
              size="small"
              sx={{
                height: 17,
                bgcolor: col.lightColor,
                color: col.color,
                "& .MuiChip-label": { px: 0.85 },
              }}
            />
          </Stack>

          <Tooltip title={`Add to ${col.label}`} arrow>
            <IconButton
              size="small"
              onClick={() => openCreateModal(col.id)}
              sx={{
                width: 24,
                height: 24,
                color: col.color,
                bgcolor: col.lightColor,
                "&:hover": { bgcolor: alpha(col.color, 0.22) },
              }}
            >
              <AddIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1.25, minHeight: 110 }}>
          {paginated.length === 0 && <EmptyColumn />}

          {paginated.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              col={col}
              onEdit={() => openEditModal(task)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}

          {hasMore && (
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => incrementPage(col.id)}
              sx={{
                borderStyle: "dashed",
                borderColor: "divider",
                color: "text.secondary",
                fontSize: "0.7rem",
                py: 0.6,
                "&:hover": {
                  borderColor: col.color,
                  color: col.color,
                  bgcolor: col.lightColor,
                },
              }}
            >
              Load more · {tasks.length - paginated.length} remaining
            </Button>
          )}

          <Box id={col.id} sx={{ height: 2 }} />
        </Box>
        <Tooltip title={`Add to ${col.label}`} arrow>
            <Button
              size="small"
              onClick={() => openCreateModal(col.id)}
              sx={{
                width: "100%",
                color: col.color,
                bgcolor: col.lightColor,
                "&:hover": { bgcolor: alpha(col.color, 0.22) },
              }}
              endIcon={<AddIcon sx={{ fontSize: 15 }} />}
            >
              Add Task
            </Button>
          </Tooltip>
      </Box>
    </SortableContext>
  );
}
