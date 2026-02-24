import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useTaskStore } from "@/modules/Tasks/store/useTaskStore";
import { useCreateTask, useUpdateTask } from "@/modules/Tasks/hooks/useTaskMutations";
import { COLUMN_MAP } from "@/modules/Tasks/constants/columns";
import type { CreateTaskPayload } from "@/modules/Tasks/types/task.types";

export function TaskModal() {
  const modal = useTaskStore((s) => s.modal);
  const setModalField = useTaskStore((s) => s.setModalField);
  const closeModal = useTaskStore((s) => s.closeModal);

  const { mutate: createTask, isPending: creating } = useCreateTask();
  const { mutate: updateTask, isPending: updating } = useUpdateTask();

  const col = modal.column ? COLUMN_MAP[modal.column] : undefined;
  const isPending = creating || updating;

  const handleSave = (): void => {
    if (!modal.title.trim() || !modal.column) return;

    if (modal.mode === "create") {
      const payload: CreateTaskPayload = {
        title: modal.title.trim(),
        description: modal.description.trim(),
        column: modal.column,
      };
      createTask(payload, { onSuccess: closeModal });
    } else if (modal.taskId !== null) {
      updateTask(
        { id: modal.taskId, title: modal.title.trim(), description: modal.description.trim() },
        { onSuccess: closeModal }
      );
    }
  };

  return (
    <Dialog open={modal.open} onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {col && (
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: col.color,
                boxShadow: `0 0 10px ${col.color}`,
                flexShrink: 0,
              }}
            />
          )}
          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
            {modal.mode === "create" ? `New Task · ${col?.label ?? ""}` : "Edit Task"}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "20px !important", display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="Title"
          fullWidth
          autoFocus
          size="small"
          value={modal.title}
          onChange={(e) => setModalField("title", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          size="small"
          value={modal.description}
          onChange={(e) => setModalField("description", e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ borderTop: "1px solid", borderColor: "divider", px: 3, py: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={closeModal}
          sx={{ borderColor: "#1c2238", color: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!modal.title.trim() || isPending}
          onClick={handleSave}
          sx={{
            bgcolor: col?.color ?? "primary.main",
            "&:hover": { bgcolor: col?.color, filter: "brightness(1.12)" },
            "&.Mui-disabled": { bgcolor: "#1c2238", color: "text.secondary" },
          }}
        >
          {modal.mode === "create" ? "Create Task" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
