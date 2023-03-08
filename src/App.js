import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import User from "scenes/user";
import AddUserForm from "scenes/user/addUser";
import Login from "scenes/login";
import Customers from "scenes/customers";
import AddCustomer from "scenes/customers/addCustomer";
import Orders from "scenes/orders";
import CreateOrderForm from "scenes/orders/add";
import Products from "scenes/products";
import CreateProductForm from "scenes/products/add";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/users" element={<User />} />
              <Route path="/user/add" element={<AddUserForm />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer/add" element={<AddCustomer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/add" element={<CreateOrderForm />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<CreateProductForm />} />
            </Route>
            {/* <Navigate to="/login" /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
