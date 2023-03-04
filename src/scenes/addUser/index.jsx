import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { useCreateUserMutation, useUploadImageMutation } from "state/api";

const AddUserForm = () => {
  const [user, setUser] = useState({});
  const [ createUser ] = useCreateUserMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [ uploadImage ] = useUploadImageMutation();

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    setImageData(imageData);
    setImagePreview(URL.createObjectURL(file));
    setUser({
      ...user,
      [event.target.name]: event.target.files[0].name,
    });
  };

  const uploadImageWithAdditionalData = () => {
    imageData.append('imageName', user.avatar);
    uploadImage(imageData);
  };

  const handleChange = (e) => {
    if (e.target.name === "roles") {
      setUser({
        ...user,
        [e.target.name]: [e.target.value],
      });
    } else if (e.target.name === "avatar") {
      console.log(e.target.files[0].name);
      setUser({
        ...user,
        [e.target.name]: e.target.files[0].name,
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add User" subtitle="Add User to User List" />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <form>
            <FormControl sx={{ mt: 3 }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                aria-describedby="my-helper-text"
                name="name"
                onChange={(e) => handleChange(e)}
              />
              <FormHelperText id="my-helper-text">Name of user</FormHelperText>
            </FormControl>
            <Box>
              <FormControl sx={{ mt: 3 }}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  aria-describedby="my-helper-text"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                <FormHelperText id="my-helper-text">
                  username is unique
                </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ mt: 3 }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  aria-describedby="my-helper-text"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <FormHelperText id="my-helper-text">
                  We keep password encrypted
                </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ mt: 3 }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  aria-describedby="my-helper-text"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
                <FormHelperText id="my-helper-text">
                  We'll never share email
                </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ mt: 3 }}>
                <InputLabel htmlFor="avatar">Avatar</InputLabel>
                <Input
                  type="file"
                  id="avatar"
                  aria-describedby="my-helper-text"
                  name="avatar"
                  onChange={handleUploadClick}
                />
                <FormHelperText id="my-helper-text">
                  User's avatar
                </FormHelperText>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user.roles || ""}
                  label="Role"
                  name="roles"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={"super_admin"}>SUPER_ADMIN</MenuItem>
                  <MenuItem value={"admin"}>ADMIN</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={() => {
                  createUser(user);
                  uploadImageWithAdditionalData();
                  setUser({})
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AddUserForm;
