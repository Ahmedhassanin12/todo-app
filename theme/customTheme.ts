import { createTheme } from "@mui/material/styles";
import { mainFont } from "./fonts";

const fonts = [mainFont.style.fontFamily, "Roboto", "sans-serif"].join(",");

export const customTheme = () => {
  const theme = createTheme({
    typography: {
      fontFamily: fonts,
      allVariants: {
        fontFamily: fonts,
        fontWeight: 500,
      },
      fontWeightRegular: 500,
      fontWeightBold: 700,
      fontWeightMedium: 600,
      fontWeightLight: 400,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            "&:focus": {
              outline: "none",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          autoComplete: "off",
        },
      },
      MuiInput: {
        defaultProps: {
          autoComplete: "off",
        },
      },
      MuiInputBase: {
        defaultProps: {
          autoComplete: "off",
        },
      },
      MuiTooltip: {
        defaultProps: {
          enterNextDelay: 1000,
          disableInteractive: true,
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ...mainFont,
        },
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,

      },
    },
    palette: {
      mode: "light",
      background: {
        // default: "black",
        default: "#f5f5f5",
      },
      primary: {
        main: "#4281D4",
      },
      secondary: {
        main: "#F0C755",
      },
    },
  });
  return theme;
};
