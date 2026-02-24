import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      size="small"
      placeholder="Search tasks..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 250 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "text.secondary", fontSize: 17 }} />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton size="small" edge="end" onClick={() => onChange("")}>
              <ClearIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
