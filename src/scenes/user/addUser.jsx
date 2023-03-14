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
  TextField
} from "@mui/material";
import Header from "components/Header";
import UploadWidget from "components/UploadWidget ";
import React, { useState,useEffect } from "react";
import { useCreateUserMutation } from "state/apiUser";

const AddUserForm = () => {
  const [user, setUser] = useState({});
  const [createUser] = useCreateUserMutation();
  const [error, setError] = useState({});
  const newError = { ...error };
  const [url, updateUrl] = useState();

  function handleOnUpload(errorImage, result, widget) {
    if (errorImage) {
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }
  useEffect(() => {
    if (url != null) {
      setUser({
        ...user,
        avatar: url,
      });
    }
  }, [url])

  const handleChange = (e) => {
    if (e.target.name === "roles") {
      setUser({
        ...user,
        [e.target.name]: [e.target.value],
      });
    }
    else {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    const { name, value } = e.target;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value) {
      newError[name] = "This field is required";
    } else if (name === "password" && !regex.test(value)) {
      newError[name] = "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character";
    } else if (name === "email" && !regexEmail.test(value)) {
      newError[name] = "Your email must be in the form @***.com";
    } else {
      delete newError[name];
    }
    setError(newError);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADD USER" subtitle="Add User to User List" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiInputBase-root": {
            width: "50vh",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={4}>
            <form>
              <FormControl sx={{ mt: 3 }}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  aria-describedby="my-helper-text"
                  name="name"
                  onChange={handleChange}
                  error={error.name ? true : false}
                  helperText={error.name}
                />
                <FormHelperText id="my-helper-text">
                  Name of user
                </FormHelperText>
              </FormControl>
              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    aria-describedby="my-helper-text"
                    name="username"
                    onChange={handleChange}
                    error={error.username ? true : false}
                    helperText={error.username}
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
                    onChange={handleChange}
                    error={error.password ? true : false}
                    helperText={error.password}
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
                    onChange={handleChange}
                    error={error.email ? true : false}
                    helperText={error.email}
                  />
                  <FormHelperText id="my-helper-text">
                    We'll never share email
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }) => {
                      function handleOnClick(e) {
                        e.preventDefault();
                        open();
                      }
                      return <button onClick={handleOnClick}>Upload an Image</button>;
                    }}
                  </UploadWidget>
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
                    onChange={handleChange}
                  >
                    <MenuItem value={"super_admin"}>SUPER_ADMIN</MenuItem>
                    <MenuItem value={"admin"}>ADMIN</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button>Cancel</Button>
                {url && <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (Object.keys(newError).length === 0) {
                      createUser(user);
                      window.confirm("Add Successful User")
                    }
                  }}
                >
                  Save
                </Button>}
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default AddUserForm;
