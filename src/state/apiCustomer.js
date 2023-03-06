import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
const config = {
  headers: {
    'Authorization': `${token}`,
  },
};
export const apiCustomer = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8004/api" }),
  reducerPath: "adminApi",
  tagTypes: ["Customer"],
  endpoints: (build) => ({
    getCustomer: build.query({
      query: () => ({
        url: '/customers',
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        headers: config.headers,
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    createFile: build.mutation({
      query: (file) => ({
        url: "/customers/file",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: (customer) => ({
        url: `/customers`,
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
        url: `/customers/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Customer"],
    }),
    getFirstName: build.query({
      query: (firstName) => ({
        url: `/customers/search/${firstName}`,
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Customer"],
    }),
  }),
});
export const { useGetCustomerQuery,
useUpdateCustomerMutation,
useCreateFileMutation,
useDeleteCustomerMutation,
useCreateCustomerMutation,
useGetFirstNameQuery} = apiCustomer;

