import { Box } from "@mui/system";
import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image, size, rows = 2, cols = 2) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 8x`,
  };
}

const MyPosts = ({ posts }) => {
  return (
    <Box m={2}>
      <ImageList
        sx={{ height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {posts &&
          posts.length &&
          posts.map((item) => (
            <ImageListItem
              key={item._id}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.photo, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default MyPosts;
