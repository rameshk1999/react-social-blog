import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import instance from "../../config/axios";
import { ColorContext } from "../../contexts/ColorContext";

function EmailVerify() {
  let token = useParams();
  const location = useLocation();
  const string = new URLSearchParams(location.search).get("username");

  const [isVerified, setIsVerified] = React.useState(false);
  const { user } = React.useContext(ColorContext);
  const handleLogout = () => {
    localStorage.removeItem("user-data");
  };

  useEffect(() => {
    console.log(token.id, string);
    if (user) {
      handleLogout()
        .then(() => {
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
        })
        .catch((err) => {});
    } else {
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
    }
  }, [token]);

  return (
    <div>
      {isVerified && (
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: "auto",
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">
              {string}, Your Email has been verified Successfully!
            </Typography>
            <br />
            <br />
            {/* <div>
              <Typography variant="p">Please Login to continue</Typography>
            </div> */}
          </Card>
        </Box>
      )}
    </div>
  );
}

export default EmailVerify;
