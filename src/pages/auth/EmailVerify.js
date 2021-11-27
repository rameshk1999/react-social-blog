import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import instance from "../../config/axios";

function EmailVerify() {
  let token = useParams();
  const location = useLocation();
  const string = new URLSearchParams(location.search).get("username");

  const [isVerified, setIsVerified] = React.useState(false);

  useEffect(() => {
    console.log(token.id, string);

    instance
      .get(`/api/users/verify/${token.id}?username=${string}`)
      .then((res) => {
        if (res.status === 200) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        setIsVerified(false);
      });
  }, [token]);

  return (
    <div>
      {isVerified && <Typography>Email verified Successfully!</Typography>}
    </div>
  );
}

export default EmailVerify;
