import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import instance from "../../config/axios";
import { ColorContext } from "../../contexts/ColorContext";
import PostCard from "./PostCard";

export default function SinglePost() {
  let { id } = useParams();
  const { user } = React.useContext(ColorContext);
  const [post, setPost] = useState("");
  const [reload, setReLoad] = useState(false);

  useEffect(() => {
    console.log(id);
    instance.get(`/api/posts/get/${id}`).then((res) => {
      console.log(res.data.data);
      setPost(res.data.data);
    });
  }, [id, reload]);
  const addLike = (id) => {
    instance
      .put("/api/posts/like", { postId: id, userId: user?._id })
      .then((res) => {
        // console.log(res);
        setReLoad(true);
        setReLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLike = (id) => {
    instance
      .put("/api/posts/unlike", { postId: id, userId: user?._id })
      .then((res) => {
        // console.log(res);
        setReLoad(true);
        setReLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Container>
        {post && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={5}>
              <PostCard post={post} addLike={addLike} unLike={unLike} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
