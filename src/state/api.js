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
  tagTypes: [
    "User",
    "Customer",
  ],
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
    getCustomer: build.query({
      query: () => ({
        url: 'http://localhost:8004/api/customers',
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation({
      query: (customer) => ({
        url: "http://localhost:8004/api/customers",
        method: "POST",
        headers: config.headers,
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    createFile: build.mutation({
      query: (file) => ({
        url: "http://localhost:8004/api/customers/file",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: (customer) => ({
        url: `http://localhost:8004/api/customers`,
        method: "PUT",
        headers: {
          ...config.headers,
        },
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation({
      query: (id ) => ({
        url: `http://localhost:8004/api/customers/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Customer"],
    }),
    getFirstName: build.query({
      query: (firstName) => ({
        url: `http://localhost:8004/api/customers/search/${firstName}`,
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Customer"],
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
  useGetCustomerQuery,
  useUpdateCustomerMutation,
  useCreateFileMutation,
  useDeleteCustomerMutation,
  useCreateCustomerMutation,
  useGetFirstNameQuery
} = api;
