import { Box } from "@mui/system";
import React from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SigninPage";
import SignUp from "./pages/SignupPage";
import Profile from "./pages/profile/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Layout>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Box>
    </BrowserRouter>
  );
};

export default App;
