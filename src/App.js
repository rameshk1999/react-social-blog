import { Box } from "@mui/system";
import React, { useContext } from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SigninPage";
import SignUp from "./pages/SignupPage";
import Profile from "./pages/profile/ProfilePage";
import { ColorContext } from "./contexts/ColorContext";

const App = () => {
  const { user } = useContext(ColorContext);
  console.log(user);
  return (
    <Box>
      <Layout>
        <Routes>
          {!user ? (
            <>
              {" "}
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />{" "}
            </>
          ) : (
            <>
              {" "}
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/profile" element={<Profile />} />{" "}
            </>
          )}
        </Routes>
      </Layout>
    </Box>
  );
};

export default App;
