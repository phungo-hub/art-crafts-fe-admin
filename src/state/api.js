import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
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
        url: `/user/image`,
        method: "POST",
        headers: config.headers,
        body: imageData,
      }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: `auth/login`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    searchUserByUsername: build.query({
      query: (username) => {
        return {
          url: `/user/search?username=${username}`,
          method: "GET",
          headers: config.headers,
          // params: id
        };
      },
      providesTags: ["User"],
    }),
  }),
});
export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUploadImageMutation,
  useLoginMutation,
  useSearchUserByUsernameQuery,
} = api;
