import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
  alpha,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import type { Task, Column } from "@/modules/Tasks/types/task.types";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  col: Column | undefined;
  onEdit?: () => void;
  onDelete?: () => void;
  overlay?: boolean;
}

export function TaskCard({ task, col, onEdit, onDelete, overlay = false }: TaskCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => !overlay && setHovered(true)}
      onMouseLeave={() => !overlay && setHovered(false)}
      sx={{
        cursor: overlay ? "grabbing" : "grab",
        borderLeft: `3px solid ${col?.color ?? "#7c6af7"} !important`,
        ...(overlay && {
          transform: "rotate(1.5deg) scale(1.03)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }),
      }}
    >
      <CardContent sx={{ pt: 1.5, px: 1.75, pb: "6px !important" }}>
        <Stack direction="row" alignItems="flex-start" spacing={0.5}>
          <DragIndicatorIcon
            sx={{ fontSize: 14, color: "text.secondary", opacity: 0.3, mt: 0.25, flexShrink: 0 }}
          />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.81rem", lineHeight: 1.4, mb: 0.5 }}>
              {task.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", lineHeight: 1.5, display: "block", fontSize: "0.72rem" }}
            >
              {task.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {!overlay && (
        <CardActions
          sx={{
            px: 1.5,
            pt: 0.25,
            pb: 1,
            gap: 0.5,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.14s ease",
          }}
        >
          <Button
            size="small"
            startIcon={<EditOutlinedIcon sx={{ fontSize: "12px !important" }} />}
            onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
            sx={{
              fontSize: "0.68rem",
              py: 0.3,
              px: 1,
              color: "text.secondary",
              bgcolor: "#1c2238",
              "&:hover": { bgcolor: "#232d52", color: "text.primary" },
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            startIcon={<DeleteOutlineIcon sx={{ fontSize: "12px !important" }} />}
            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
            sx={{
              fontSize: "0.68rem",
              py: 0.3,
              px: 1,
              color: "#f87171",
              bgcolor: alpha("#f87171", 0.08),
              "&:hover": { bgcolor: alpha("#f87171", 0.18) },
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
