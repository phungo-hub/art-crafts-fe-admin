import { createSlice } from "@reduxjs/toolkit";
import { apiUser } from "./apiUser";

const initialState = {
  loginResponse: null,
};

// Config slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginResponse = null;
      state.errorMessage = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiUser.endpoints.login.matchFulfilled, (state, action) => {
      state.loginResponse = action.payload;
    });
  },
});

// Export actions
export const { logout } = userSlice.actions;

// Select state loginResponse from slice
export const selectUser = (state) => state.user.loginResponse;

// Export reducer
export default userSlice.reducer;
