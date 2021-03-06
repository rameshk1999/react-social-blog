import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Sidebar from "./Sidebar";
import { ColorContext } from "../contexts/ColorContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function ButtonAppBar() {
  const theme = useTheme();

  const history = useNavigate();
  const { colorMode, user } = React.useContext(ColorContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <Sidebar /> */}
          <Typography
            onClick={() => history("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Seven
          </Typography>
          {user ? (
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={() => history("/profile")}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </IconButton>
          ) : (
            <div>
              <Button
                onClick={() => history("/signin")}
                style={{ marginRight: 5 }}
                color="inherit"
              >
                Signin
              </Button>
              <Button
                onClick={() => history("/signup")}
                color="inherit"
                style={{ marginRight: 2 }}
              >
                Sign Up
              </Button>
            </div>
          )}
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
