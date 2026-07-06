import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { HashRouter } from "react-router";
import AppRoutes from "./AppRoutes";
import ScoreboardStore from "./ScoreboardStore";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <ScoreboardStore>
          <AppRoutes />
        </ScoreboardStore>
      </HashRouter>
    </ThemeProvider>
  );
}
