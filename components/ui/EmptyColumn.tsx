import { Box, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

export function EmptyColumn() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        gap: 1,
        opacity: 0.25,
      }}
    >
      <InboxOutlinedIcon sx={{ fontSize: 28, color: "text.secondary" }} />
      <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.72rem" }}>
        Drop tasks here
      </Typography>
    </Box>
  );
}
