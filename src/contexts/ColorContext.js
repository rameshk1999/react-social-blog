import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ColorContext = React.createContext();

const ColorProvider = ({ children }) => {
  const [mode, setMode] = React.useState("dark");
  const [user, setUser] = React.useState(true);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const authUser = () => {
    setUser(!user);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorContext.Provider value={{ colorMode, user }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorContext.Provider>
  );
};

export default ColorProvider;
