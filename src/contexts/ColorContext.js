import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ColorContext = React.createContext();

const ColorProvider = ({ children }) => {
  const [mode, setMode] = React.useState("dark");
  const [user, setUser] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-data"));
    setUser(userData);
  }, []);

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
    <ColorContext.Provider value={{ colorMode, user, authUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorContext.Provider>
  );
};

export default ColorProvider;
