import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Layout from "./Layout";

const NotFound = () => {
  return (
    <Box sx={{ justifyContent: "center", textAlign: "center", mt: 6 }}>
      <Typography variant="h5">
        Something Went Wrong, Please Try Later !
      </Typography>
    </Box>
  );
};

export default NotFound;
