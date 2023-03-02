// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   loading: false,
//   user: null,
//   error: null,
//   success: false,
// };

// const config = {
//   header: {
//     Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaHUiLCJpYXQiOjE2Nzc2ODUzODUsImV4cCI6MTY3ODI5MDE4NX0.ziqtu9BruaoxJ7RD3T093jxuzN3IICZ6SLHn0yAqvPVEIhzX1cqQ3WL6P-8n_Wx8sfqwa53kFm-QRyTiQd1rEw`,
//   },
// };

// export const fetchUserList = createAsyncThunk("user/fetch", async () => {
//   const res = await axios
//     .get(`http://localhost:8001/api/user`, config)
//     .then((res) => res.data)
//     .catch((err) => {
//       throw err;
//     });
//   return res;
// });

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserList.pending, (state, action) => {
//         state.success = false;
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserList.rejected, (state, action) => {
//         state.success = false;
//         state.loading = false;
//         state.error = action.error;
//       })
//       .addCase(fetchUserList.fulfilled, (state, action) => {
//         state.success = true;
//         state.loading = false;
//         state.error = false;
//       });
//   },
// });

// export const selectLoading = (state) => state.user.loading;
// export const selectSuccess = (state) => state.user.success;
// export const selectOrder = (state) => state.user.user;

// export default userSlice.reducer;
