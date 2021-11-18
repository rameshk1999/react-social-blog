import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate } from "react-router-dom";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const LikedPosts = ({ likePosts }) => {
  // const itemData = [...likePosts];
  console.log("page", likePosts);
  let navigate = useNavigate();

  return (
    <Box m={2}>
      <ImageList
        sx={{ height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {likePosts &&
          likePosts.length &&
          likePosts.map((item, index) => (
            <ImageListItem
              key={index}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                onClick={() => navigate(`/posts/${item.postId}`)}
                {...srcset(item.postImage, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
              <h5>{item.photoId}</h5>
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default LikedPosts;
