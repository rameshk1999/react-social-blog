import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import instance from "../config/axios";
import PostCard from "./posts/PostCard";
import CategoryCard from "./categories/CategoryCard";
import { Box } from "@mui/system";

export default function HomePage() {
  const [posts, setPosts] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    instance
      .get("/api/posts/getall")
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    instance.get("api/categories/getall").then((res) => {
      if (res.status === 200) {
        setCategories(res.data.data);
      }
    });
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="row" spacing={3}>
        <Grid item xs="12" md="7">
          {posts &&
            posts.length &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </Grid>
        <Grid item xs="12" md="4">
          {categories && categories.length && (
            <Box sx={{ textAlign: "center", m: 2 }}>
              <Typography variant="button">Categories</Typography>
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
