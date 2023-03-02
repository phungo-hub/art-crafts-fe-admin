import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import React,{ useEffect, useState } from "react";
import { useGetUserQuery } from "state/api";


const User = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUserQuery();

    const columns = [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
      },
      {
        field: "username",
        headerName: "Username",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 0.5,
      },
      {
        field: "password",
        headerName: "Password",
        flex: 0.4,
      },
      {
        field: "roles",
        headerName: "Roles",
        flex: 1,
      },
      {
        field: "avatar",
        headerName: "Avatar",
        flex: 0.4,
      },
    ];
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Users" subtitle="List of Users" />
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
            rows={data || []}
            columns={columns}
          />
        </Box>
      </Box>
    );
  };
  
  export default User;