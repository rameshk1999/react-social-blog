import { Skeleton, Stack } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import instance from "../../config/axios";
import PostCard from "./PostCard";

const PostsPage = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    instance
      .get("/api/posts/getall")
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data.data);
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
        <Stack spacing={3}>
          <Skeleton variant="text" width={410} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={410} height={208} />
        </Stack>
        <Stack spacing={3}>
          <Skeleton variant="text" width={410} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={410} height={208} />
        </Stack>
        <Stack spacing={3}>
          <Skeleton variant="text" width={410} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={410} height={208} />
        </Stack>
      </div>
    );

  return (
    <Fragment>
      {posts &&
        posts.length &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
    </Fragment>
  );
};

export default PostsPage;
