import { Box } from "@mui/system";
import React from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Box>
      <Layout>
        <HomePage />
      </Layout>
    </Box>
  );
};

export default App;
