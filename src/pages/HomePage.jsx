import { Container, Grid } from "@mui/material";
import React from "react";
import PostsPage from "./posts/PostsPage";
import CategoryPage from "./categories/CategoryPage";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Grid container direction="row" spacing={4}>
        <Grid item xs="12" md="7">
          <PostsPage />
        </Grid>
        <Grid item xs="12" md="4">
          <CategoryPage />
        </Grid>
      </Grid>
    </Container>
  );
}
