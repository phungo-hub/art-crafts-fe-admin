import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { api } from "state/api";
import { Provider } from "react-redux";
import userReducer from "state/userSlice";
import { apiCustomer } from "state/apiCustomer";
import { apiOrder } from "state/apiOrder";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    [apiOrder.reducerPath]: apiOrder.reducer,
    user: userReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware).concat(apiOrder.middleware),
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
