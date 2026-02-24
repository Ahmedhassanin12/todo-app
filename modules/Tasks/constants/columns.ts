import type { Column, ColumnId } from "@/modules/Tasks/types/task.types";

export const COLUMNS: Column[] = [
  {
    id: "backlog",
    label: "Backlog",
    color: "#7c6af7",
    lightColor: "rgba(124,106,247,0.12)",
  },
  {
    id: "in_progress",
    label: "In Progress",
    color: "#f5a623",
    lightColor: "rgba(245,166,35,0.12)",
  },
  {
    id: "review",
    label: "Review",
    color: "#e91e8c",
    lightColor: "rgba(233,30,140,0.12)",
  },
  {
    id: "done",
    label: "Done",
    color: "#00c896",
    lightColor: "rgba(0,200,150,0.12)",
  },
];

export const COLUMN_MAP = Object.fromEntries(
  COLUMNS.map((c) => [c.id, c])
) as Record<ColumnId, Column>;
