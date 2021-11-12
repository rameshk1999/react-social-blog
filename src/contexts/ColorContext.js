import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import moment from "moment";

export const ColorContext = React.createContext();

const ColorProvider = ({ children }) => {
  const [mode, setMode] = React.useState("dark");
  const [user, setUser] = React.useState();

  const DateConvertor = (data) => {
    var arr = data.split("T");
    var today = moment().format().split("T")[0];
    var common = moment(arr[0], "YYYY-MM-DD").fromNow();
    var newArr = moment().format("MMMM Do YYYY, h:mm:ss a", data).split(",");
    var newform = moment().calendar(data);
    console.log(newform);
    if (arr[0] === today) return `today at ${newArr[1]}`;
    return newArr[0];
  };

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
    <ColorContext.Provider value={{ colorMode, user, DateConvertor, authUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorContext.Provider>
  );
};

export default ColorProvider;
