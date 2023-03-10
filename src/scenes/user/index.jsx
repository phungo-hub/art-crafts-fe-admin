import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSearchUserByUsernameQuery,
  useUploadImageMutation
} from "state/apiUser";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"

import { Image } from "mui-image";


const User = () => {
  const theme = useTheme();
  const [saveUser] = useUpdateUserMutation();

  const { data, isLoading } = useGetUserQuery();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const [searchText, setSearchText] = useState("");
  const { data: list } = useSearchUserByUsernameQuery(searchText);
  const [file, setFile] = useState(null);
  const [updateFile] = useUploadImageMutation();


  const dataRow = searchText ? (list || []) : (data || []);

  const deleteHandler = (id) => {
    deleteUser(id);
    setDeleteFormOpen(false);
  };
  const handleClose = () => {
    setSelectedRow(null);
    setEditFormOpen(false);
    setDeleteFormOpen(false);
  };
  const handleSubmit = () => {
    setEditFormOpen(false);
    saveUser(selectedRow);
    updateFile(file);
    console.log(file)
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => {

        return (
          <Image src={`./assets/${params.row.avatar}`} height="32px" width="32px" sx={{ borderRadius: "50%" }} />
        )
      },
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleEditClick = (row) => {
          setSelectedRow(row);
          setEditFormOpen(true);
        };
        const handleDeleteClick = (row) => {
          setSelectedRow(row);
          setDeleteFormOpen(true);
        };
        return (
          <>
            <IconButton
              onClick={() => {
                handleEditClick(params.row);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteClick(params.row);
              }}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="User" subtitle="List of User" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={dataRow}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchText, setSearchText },
          }}
        />
        <Modal
          open={editFormOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form noValidate>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: theme.palette.background.default,
                color: theme.palette.secondary[100],
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" id="edit-form-title">
                Edit Order #{selectedRow?.id}
              </Typography>
              <TextField
                label="ID"
                fullWidth
                value={selectedRow?.id || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    id: e.target.value,
                  })
                }
                margin="normal"
                disabled
                variant="standard"
              />
              <TextField
                label="Name"
                fullWidth
                value={selectedRow?.name || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    name: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Password"
                fullWidth
                value={selectedRow?.password || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    password: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
              />
              <TextField
                label="Email"
                fullWidth
                value={selectedRow?.email || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    email: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="file"
                onChange={(event) => {
                  const selectedFile = event.target.files[0];
                  if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile, selectedFile.name);
                    setFile(formData);
                    setSelectedRow({
                      ...selectedRow,
                      avatar: selectedFile.name,
                    });

                  }
                }}
              />
              <TextField
                label="Roles"
                fullWidth
                value={selectedRow?.roles || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    roles: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                variant="outlined"
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={() => setEditFormOpen(false)}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ ml: 2 }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Modal>
        <Modal
          open={deleteFormOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form noValidate>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: 24,
                p: 4,
                bgcolor: theme.palette.background.default,
                color: theme.palette.secondary[100],
              }}
            >
              <Typography variant="h6" component="h2" id="edit-form-title">
                Delete User #{selectedRow?.id}
              </Typography>
              <TextField
                label="ID"
                fullWidth
                value={selectedRow?.id || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    id: parseInt(e.target.value),
                  })
                }
                margin="normal"
                disabled
                variant="standard"
              />
              <TextField
                label="Name"
                fullWidth
                value={selectedRow?.name || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    name: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                disabled
                variant="standard"
              />
              <TextField
                label="Password"
                fullWidth
                value={selectedRow?.password || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    password: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                disabled
                variant="standard"
              />
              <TextField
                label="Email"
                fullWidth
                value={selectedRow?.email || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    email: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                disabled
                variant="standard"
              />
              <TextField
                label="Avatar"
                fullWidth
                value={selectedRow?.avatar || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    avatar: e.target.value,
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                disabled
                variant="standard"
              />
              <TextField
                label="Roles"
                fullWidth
                value={selectedRow?.roles || ""}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    roles: new Set(e.target.value),
                  })
                }
                sx={{ mt: 3 }}
                margin="normal"
                disabled
                variant="standard"
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={() => setEditFormOpen(false)}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    deleteHandler(selectedRow?.id);
                  }}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </form>
        </Modal>
      </Box>
    </Box>
  );
};
export default User;
