import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { apiUser } from "state/apiUser";
import { Provider } from "react-redux";
import userReducer from "state/userSlice";
import { apiCustomer } from "state/apiCustomer";
import { apiOrder } from "state/apiOrder";
import { apiProduct } from "state/apiProduct";
import { apiCategory } from "state/apiCategory";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiOrder.reducerPath]: apiOrder.reducer,
    [apiCustomer.reducerPath]: apiCustomer.reducer,
    [apiProduct.reducerPath] : apiProduct.reducer,
    [apiCategory.reducerPath] : apiCategory.reducer,
    user: userReducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(apiUser.middleware)
      .concat(apiOrder.middleware)
      .concat(apiCustomer.middleware)
      .concat(apiProduct.middleware)
      .concat(apiCategory.middleware)
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
