import React, { useContext, useEffect } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorContext } from "../contexts/ColorContext";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location.pathname);
  const { user } = useContext(ColorContext);
  console.log(user);

  function checkUser() {
    if (!user) {
      return navigate("/signin");
    } else {
      return;
    }
  }
  useEffect(() => {
    // checkUser();
  }, []);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
