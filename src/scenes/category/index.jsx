import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DataGridCategoryToolbar from "components/DataGridCustomToolbar";
import {
  
  useDeleteCategoryMutation,
  useGetNameCategoryQuery,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../state/apiCategory";


const Categories = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCategoriesQuery();
  const [saveCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { data: dataSearch } = useGetNameCategoryQuery(searchInput);

  console.log(dataSearch)
     const handleSubmit = () => {
    setEditFormOpen(false);
    saveCategory(selectedRow);
    
  };

  const handleDeleteRow = (row) => {
    deleteCategory(row.id);
    setDeleteFormOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "Category Id",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
    },
   
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleEditClick = () => {
          setSelectedRow(params.row);
          setEditFormOpen(true);
        };

        const handleDeleteClick = () => {
          setDeleteFormOpen(true);
          setSelectedRow(params.row);
        };

        return (
          <>
            <IconButton onClick={handleEditClick}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CATEGORY" subtitle="List of Category" />

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
          "& .image": {
            borderRadius: "50%",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={searchInput ? dataSearch || [] : data || []}
          // rows={data || []}
          columns={columns}
          components={{ Toolbar: DataGridCategoryToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput },
          }}
        />

        <Modal
          open={editFormOpen}
          onClose={() => setEditFormOpen(false)}
          aria-labelledby="edit-form-title"
        >
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
              Edit Category #{selectedRow?.id}
            </Typography>
            <TextField
              label="Category Name"
              fullWidth
              value={selectedRow?.name || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  name: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
          
          
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                sx={{
                  color: theme.palette.secondary[100],
                }}
                color="inherit"
                onClick={() => setEditFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
                sx={{ ml: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={deleteFormOpen}
          onClose={() => setDeleteFormOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
              Delete Product #{selectedRow?.id}
            </Typography>

            <TextField
              label="name "
              fullWidth
              value={selectedRow?.name || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  name: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />

         

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                sx={{
                  color: theme.palette.secondary[100],
                }}
                color="inherit"
                onClick={() => setDeleteFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleDeleteRow(selectedRow);
                }}
                sx={{ ml: 2 }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Categories;
