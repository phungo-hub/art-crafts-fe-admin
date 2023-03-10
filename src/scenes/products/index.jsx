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
import DataGridProductToolbar from "components/DataGridCustomToolbar";
import {
  useCreateFileMutation,
  useDeleteProductMutation,
  useGetNameQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../state/apiProduct";
import Image from "mui-image";

const Products = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  const [saveProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: dataSearch } = useGetNameQuery(searchText);

  const [file, setFile] = useState(null);
  const [updateFile] = useCreateFileMutation();

  const handleSubmit = () => {
    setEditFormOpen(false);
    saveProduct(selectedRow);
    updateFile(file);
  };

  const handleDeleteRow = (row) => {
    deleteProduct(row.id);
    setDeleteFormOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      headerAlign: "center",
      flex: 0.5,
      renderCell: (params) => (
        <Image
          className="image"
          src={`../../assets/${params.row.image}`}
          alt="Product"
          height="32px"
          width="32px"
        />
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "category_name",
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
      <Header title="PRODUCT" subtitle="List of Product" />

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
          rows={searchText ? dataSearch || [] : data || []}
          columns={columns}
          components={{ Toolbar: DataGridProductToolbar }}
          componentsProps={{
            toolbar: { searchText, setSearchText },
          }}
          pageSize={10}
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
              Edit Product #{selectedRow?.id}
            </Typography>
            <TextField
              label="Product Name"
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
          
            <TextField
              label="Price"
              fullWidth
              value={selectedRow?.price || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  price: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              value={selectedRow?.description || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  description: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="file"
              onChange={(event) => {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                  const formData = new FormData();
                  formData.append("file", selectedFile, selectedFile.name);
                  setFile(formData);
                  setSelectedRow({
                    ...selectedRow,
                    image: selectedFile.name,
                  });
                }
              }}
            />
            z
            <TextField
              label="Quantity"
              fullWidth
              value={selectedRow?.quantity || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  quantity: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Category name"
              fullWidth
              value={selectedRow?.category_name || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  category_name: e.target.value,
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

            <TextField
              disabled
              label="Price"
              fullWidth
              value={selectedRow?.price || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  price: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Description"
              fullWidth
              value={selectedRow?.description || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  description: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Image"
              fullWidth
              value={selectedRow?.image || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  image: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Quantity"
              fullWidth
              value={selectedRow?.quantity || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  quantity: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Category name"
              fullWidth
              value={selectedRow?.category_name || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  category_name: e.target.value,
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

export default Products;
