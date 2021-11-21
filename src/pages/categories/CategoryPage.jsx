import { Typography, Skeleton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import instance from "../../config/axios";
import CategoryCard from "./CategoryCard";

const CategoryPage = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    instance
      .get("api/categories/getall")
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div>
        <Stack spacing={5}>
          <Skeleton variant="text" width={410} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
        <Stack spacing={5}>
          <Skeleton variant="text" width={410} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
        <Stack spacing={5}>
          <Skeleton variant="text" width={410} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </div>
    );
  return (
    <div>
      {categories && categories.length ? (
        <Box sx={{ textAlign: "center", m: 2 }}>
          <Typography variant="button">Categories</Typography>
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default CategoryPage;
