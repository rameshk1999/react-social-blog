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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MyPosts from "./MyPosts";
import FavouritePosts from "./FavouritePost";
import LikedPosts from "./LikedPosts";
import Modal from "@mui/material/Modal";
import instance from "../../config/axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ColorContext } from "../../contexts/ColorContext";
import storage from "../../config/firebase";

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
  const [url, setUrl] = React.useState("");
  const [image, setImage] = React.useState("");
  const [caption, SetCaption] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [password, setPassword] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [dele, setDele] = React.useState(false);
  const { user } = React.useContext(ColorContext);

  React.useEffect(() => {
    setLoading(true);
    instance
      .get(`/api/posts/getall?user=${user?.username}`)
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data.data);
          setLoading(false);
          setPhotos(res.data.data.filter((post) => post.photo));
          console.log(
            "post",
            res.data.data.filter((post) => post.photo),
            res.data.data
          );
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [user?.username]);

  const handleClickVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Post created");
  };

  const handleClickUpdate = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(dele ? "Account Deleted" : "Profile Updated");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFireBaseUpload = (e) => {
    if (image == null) return;
    storage
      .ref("images")
      .child("/myimages")
      .getDownloadURL()
      .then((fireBaseUrl) => {
        console.log(fireBaseUrl);
        setUrl((prevObject) => ({ ...prevObject, imgUrl: fireBaseUrl }));
      });
  };

  const uploadImage = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (image === "") {
      console.error(`not an image, the image file is a ${typeof image}`);
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setUrl(fireBaseUrl);
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      desc: caption,
      username: user.username,
      title: user.username,
      photo: url,
    };

    instance
      .post("api/posts/create", payload)
      .then((res) => {
        if (res.status === 201) {
          handleClose();
          handleClickVariant("success");
          window.setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpload = () => {
    setEdit(true);
    handleOpen();
  };
  const handleLogout = () => {
    localStorage.removeItem("user-data");
    window.setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    let payload1 = {
      userId: user?._id,
      username: user?.username,
      password: password,
      profileImage: url,
    };
    instance
      .put(`api/users/${user?._id}`, payload1)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          handleClickUpdate("success");
          handleLogout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDele = (e) => {
    e.preventDefault();
    setEdit(true);
    setDele(true);
    handleOpen();
  };
  const handleDeleteAccount = (e) => {
    let payload2 = {
      userId: user?._id,
      username: user?.username,
      password: password,
    };
    instance
      .delete(`api/users/${user?._id}`, { data: payload2 })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          handleClickUpdate("success");
          handleLogout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="md">
      <Box m={4} sx={{ justifyContent: "center" }}>
        <Paper>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <label htmlFor="icon-button-file">
              {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={handleUpload}
              >
                <Avatar
                  alt={user?.username}
                  src={user?.profileImage}
                  sx={{ width: 76, height: 76 }}
                />
              </IconButton>
            </label>

            <label htmlFor="icon-button-file">
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="body2">{user?.email}</Typography>
            </label>

            {/* <Button
              color="primary"
              variant="outlined"
              aria-label="upload picture"
              component="span"
            >
              <EditIcon />
              {"   "}
              <Typography variant="body2">Edit Profile</Typography>
            </Button> */}

            <Button
              onClick={user ? handleOpen : navigate("/signin")}
              color="primary"
              variant="outlined"
              aria-label="upload picture"
              component="span"
              endIcon={<AddCircleIcon />}
            >
              {"   "}
              <Typography variant="body2">Add Post</Typography>
            </Button>

            <Button
              color="primary"
              variant="outlined"
              aria-label="upload picture"
              component="span"
              startIcon={<DeleteIcon />}
              onClick={handleDele}
            >
              {"   "}
              <Typography variant="body2">Account</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              aria-label="upload picture"
              component="span"
              endIcon={<ExitToAppIcon />}
              onClick={handleLogout}
            >
              {"   "}
              <Typography variant="body2">Logout</Typography>
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
              {posts && posts.length ? (
                <MyPosts posts={posts} />
              ) : (
                "You have no Posts yet "
              )}
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
        {edit ? (
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
                {!dele && (
                  <label htmlFor="icon-button-file">
                    <input
                      style={{
                        height: 100,
                        width: 200,
                        borderBlockColor: "WindowFrame",
                      }}
                      type="file"
                      title="Select Image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    {/*                  
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                /> */}
                    <Button
                      sx={{ width: "100%", hight: "100%", marginY: 2 }}
                      color="primary"
                      aria-label="upload picture"
                      onClick={uploadImage}
                    >
                      <FileUploadIcon /> {"   "} upload Image
                    </Button>
                  </label>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  fullWidth
                  color="secondary"
                  onClick={dele ? handleDeleteAccount : updateProfile}
                >
                  Continue
                </Button>
              </form>
            </Box>
          </Box>
        ) : (
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
                  label="Caption"
                  variant="outlined"
                  value={caption}
                  onChange={(e) => SetCaption(e.target.value)}
                  fullWidth
                />
                <label htmlFor="icon-button-file">
                  <input
                    style={{
                      height: 100,
                      width: 200,
                      borderBlockColor: "WindowFrame",
                    }}
                    type="file"
                    title="Select Image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  {/*                  
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                /> */}
                  <Button
                    sx={{ width: "100%", hight: "100%", marginY: 2 }}
                    color="primary"
                    aria-label="upload picture"
                    onClick={uploadImage}
                  >
                    <FileUploadIcon /> {"   "} upload Image
                  </Button>
                </label>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  fullWidth
                  disabled={!url}
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Continue
                </Button>
              </form>
            </Box>
          </Box>
        )}
      </Modal>
    </Container>
  );
};

export default ProfilePage;
