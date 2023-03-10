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
import React, { useState } from "react";
import { useCreateUserMutation, useUploadImageMutation } from "state/apiUser";

const AddUserForm = () => {
  const [user, setUser] = useState({});
  const [createUser] = useCreateUserMutation();
  const [file, setFile] = useState(null);
  const [updateFile] = useUploadImageMutation();

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        setFile(formData);
        setUser({
          ...user,
          avatar: selectedFile.name,
        });

      }
    } else if (e.target.name === "roles") {
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
                  />
                  <FormHelperText id="my-helper-text">
                    We'll never share email
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    type="file"
                    label="Avatar :"
                    name="avatar"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    onChange={handleChange}
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
                  onClick={() => {
                    createUser(user);
                    updateFile(file);
                    console.log(user)
                    window.confirm("Add Successful User")
                  }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default AddUserForm;
