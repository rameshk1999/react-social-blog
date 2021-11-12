import {
  Avatar,
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import MyPosts from "./MyPosts";
import FavouritePosts from "./FavouritePost";
import LikedPosts from "./LikedPosts";
import Modal from "@mui/material/Modal";

const Input = styled("input")({
  display: "none",
});

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

const ProfilePage = () => {
  const [value, setValue] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="md">
      <Box m={4}>
        <Paper>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 76, height: 76 }}
                />
              </IconButton>
            </label>

            <label htmlFor="icon-button-file">
              <Typography variant="h6">user name</Typography>
              <Typography variant="body2">Email</Typography>
            </label>

            <Button
              color="primary"
              variant="outlined"
              aria-label="upload picture"
              component="span"
            >
              <EditIcon />
              {"   "}
              <Typography variant="body2">Edit Profile</Typography>
            </Button>

            <Button
              onClick={handleOpen}
              color="primary"
              variant="outlined"
              aria-label="upload picture"
              component="span"
            >
              <AddCircleIcon />
              {"   "}
              <Typography variant="body2">Add Post</Typography>
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Box m={4}>
        <Paper>
          <TabContext value={value}>
            <Box sx={{ width: "100%", bgcolor: "background.secondary" }}>
              <TabList
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
              >
                <Tab label={<GridOnIcon />} value={1} />
                <Tab label={<BookmarkIcon />} value={2} />
                <Tab label={<FavoriteIcon />} value={3} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <MyPosts />
            </TabPanel>
            <TabPanel value={2}>
              <FavouritePosts />
            </TabPanel>
            <TabPanel value={3}>
              <LikedPosts />
            </TabPanel>
          </TabContext>
        </Paper>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              textAlign: "center",
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Post
            </Typography>
            <Divider flexItem />
            <form>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Desc"
                variant="outlined"
                fullWidth
              />
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <Button
                  sx={{ width: "100%", hight: "100%", marginY: 2 }}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <FileUploadIcon /> upload Image
                </Button>
              </label>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                fullWidth
                color="secondary"
              >
                Continue
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
