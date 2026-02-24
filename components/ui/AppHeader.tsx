import { AppBar, Toolbar, Box, Typography, Stack, alpha } from "@mui/material";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import { SearchBar } from "./SearchBar";
import { useTaskStore } from "@/modules/Tasks/store/useTaskStore";

interface AppHeaderProps {
  totalCount: number;
}

export function AppHeader({ totalCount }: AppHeaderProps) {
  const search = useTaskStore((s) => s.search);
  const setSearch = useTaskStore((s) => s.setSearch);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ px: { xs: 2, md: 3 }, gap: 2, minHeight: "58px !important" }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1 }}>
          <Box
            sx={{
              bgcolor: alpha("#7c6af7", 0.15),
              border: "1px solid",
              borderColor: alpha("#7c6af7", 0.3),
              borderRadius: 2,
              p: 0.75,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ViewKanbanOutlinedIcon sx={{ color: "#7c6af7", fontSize: 20 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Kanban Board
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
              {totalCount} task{totalCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Stack>

        <SearchBar value={search} onChange={setSearch} />
      </Toolbar>
    </AppBar>
  );
}
