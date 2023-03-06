import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaHUiLCJpYXQiOjE2Nzc4NTE3NzAsImV4cCI6MTY3ODQ1NjU3MH0.EOZe_dfL4lsFaL3g1lMuGlcs8f9FPS6FC4r6rRhO3N_MaffLkvGxmUWjRWz8WVJIaklG5SQMDMR_nFYji0ldaw`,
  },
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api",
  }),
  reducerPath: "adminApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
          headers: config.headers,
        };
      },
      providesTags: ["User"],
    }),
    createUser: build.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        headers: config.headers,
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ id, ...user }) => ({
        url: `/user/${id}`,
        method: "PUT",
        headers: config.headers,
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["User"],
    }),
    uploadImage: build.mutation({
      query: (imageData) => ({
        url: `/user/uploadImage`,
        method: "POST",
        headers: config.headers,
        body: imageData,
      }),
    }),
  }),
});
export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUploadImageMutation,
} = api;
