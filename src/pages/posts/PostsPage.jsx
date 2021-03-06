import { Skeleton, Stack } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import instance from "../../config/axios";
import { ColorContext } from "../../contexts/ColorContext";
import PostCard from "./PostCard";

const PostsPage = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [reload, setReLoad] = useState(false);
  const { user } = React.useContext(ColorContext);
  // console.log(user?._id);

  const addLike = (id, photo) => {
    console.log("like", id, photo);
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

    instance
      .put("/api/users/likedpost", {
        postId: id,
        postImage: photo,
        userId: user?._id,
      })
      .then((res) => {
        console.log("add to liked post");
        instance
          .get("/api/posts/getall")
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data.data);
              // setLoading(false);
              // console.log(res.data.data);
            }
          })
          .catch((err) => {
            // setLoading(false);
          });
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
        instance
          .get("/api/posts/getall")
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data.data);
              // setLoading(false);
              // console.log(res.data.data);
            }
          })
          .catch((err) => {
            // setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    instance
      .get("/api/posts/getall")
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data.data);
          setLoading(false);
          // console.log(res.data.data);
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
      {posts && posts.length
        ? posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
              addLike={addLike}
              unLike={unLike}
            />
          ))
        : ""}
    </Fragment>
  );
};

export default PostsPage;
