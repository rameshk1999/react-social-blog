import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ColorContext } from "../../contexts/ColorContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import instance from "../../config/axios";
import { useLocation } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function RecipeReviewCard({ post, addLike, unLike }) {
  const { DateConvertor, user } = React.useContext(ColorContext);
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const result = post?.likes.includes(user?._id);

  const handleClickVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Link copied, you share it now.", { variant });
  };
  // console.log(result); // true
  let name = "hello";
  console.log(name.charAt(0));
  const addComment = (postID) => {
    const payload = {
      postId: postID,
      text: comment,
      userId: user?._id,
      profile: user?.profileImage,
    };
    instance
      .put("/api/posts/comment", payload)
      .then((res) => {
        console.log(res);
        setComment("");
      })
      .catch((err) => {
        console.log(err.message);
      });

    console.log("coment added", payload);
  };

  return (
    <Card sx={{ maxWidth: 450, m: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.username}
        subheader={DateConvertor(post.updatedAt)}
      />
      <CardMedia
        component="img"
        onClick={() => pathname === "/" && navigate(`posts/${post._id}`)}
        height="194"
        image={post.photo ? post.photo : "/static/images/cards/paella.jpg"}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() =>
            result ? unLike(post?._id) : addLike(post?._id, post.photo)
          }
        >
          <FavoriteIcon color={result ? "error" : ""} />
        </IconButton>
        <input
          style={{ display: "none" }}
          type="text"
          value={`https://react-social-blog.vercel.app/posts/${post._id}`}
        />
        {post?.likes?.length}

        <IconButton aria-label="comment" onClick={() => handleOpen(post._id)}>
          <CommentIcon />
        </IconButton>
        {post?.comments?.length ? post?.comments?.length : ""}
        <IconButton aria-label="share">
          <CopyToClipboard
            text={`https://react-social-blog.vercel.app/posts/${post._id}`}
            onCopy={() => handleClickVariant("success")}
          >
            <ShareIcon />
          </CopyToClipboard>
        </IconButton>

        {pathname != `/` && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post?.comments?.length
            ? post?.comments.map((comment) => {
                let username = comment.username?.charAt(0);
                return (
                  <Box>
                    <IconButton aria-label="user-icon">
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        alt={username}
                        src={comment?.profile}
                      />
                    </IconButton>
                    {comment.text}
                  </Box>
                );
              })
            : ""}
        </CardContent>
      </Collapse>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={() => addComment(post._id)}>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="secondary"
              fullWidth
              disabled={!comment}
              onClick={() => addComment(post._id)}
            >
              add comment
            </Button>
          </form>
        </Box>
      </Modal>
    </Card>
  );
}
