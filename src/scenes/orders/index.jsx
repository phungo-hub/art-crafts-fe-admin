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
  useDeleteOrderMutation,
  useGetOrderDetailByOrderIdQuery,
  useGetOrdersQuery,
  useSearchOrderByCustomerIdQuery,
  useUpdateOrderMutation,
} from "state/apiOrder";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Orders = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrdersQuery();
  const [saveOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentDate, setNewDate] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data: list } = useSearchOrderByCustomerIdQuery(search);
  // const { data: orderDetail } = useGetOrderDetailByOrderIdQuery(1);
  // console.log("🚀 ~ file: index.jsx:40 ~ Orders ~ orderDetail:", orderDetail)
  


  const dataRow = search ? (list || []) : (data || []);

  const handleChangeDate = (newValue) => {
    setSelectedRow((prev) => ({
      ...prev,
      date: newValue,
    }));
    setNewDate(newValue);
  };

  const handleSubmit = () => {
    saveOrder(selectedRow);
    setEditFormOpen(false);
  };

  const handleDeleteRow = (row) => {
    deleteOrder(row.orderId);
    setDeleteFormOpen(false);
  };

  const columns = [
    {
      field: "orderId",
      headerName: "Order id",
      flex: 1,
    },
    {
      field: "customerId",
      headerName: "Customer id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date of purchase",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total price",
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

        const handleViewClick = () => {};

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
      <Header title="ORDER" subtitle="List of Order" />

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
          getRowId={(row) => row.orderId}
          // rows={data || []}
          rows={dataRow}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
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
              Edit Order #{selectedRow?.orderId}
            </Typography>

            <TextField
              disabled
              label="Customer ID"
              fullWidth
              value={selectedRow?.customerId || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  customerId: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="YYYY/MM/DD"
                value={selectedRow?.date || ""}
                // value={currentDate}

                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              label="Total Price"
              fullWidth
              value={selectedRow?.total || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  total: e.target.value,
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
              Delete Order #{selectedRow?.orderId}
            </Typography>

            <TextField
              disabled
              label="Customer ID"
              fullWidth
              value={selectedRow?.customerId || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  customerId: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disabled
                label="Date desktop"
                inputFormat="YYYY/MM/DD"
                value={selectedRow?.date || ""}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              disabled
              label="Total Price"
              fullWidth
              value={selectedRow?.total || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  total: e.target.value,
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

export default Orders;
