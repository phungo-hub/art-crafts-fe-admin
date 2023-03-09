import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
};

export const apiProduct = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8002/api" }),
  reducerPath: "productApi",
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => {
        return {
          url: "/products",
          method: "GET",
          headers: config.headers,
        };
      },
      providesTags: ["Product"],
    }),

    updateProduct: build.mutation({
      query: (product) => ({
        url: `/products`,
        method: "PUT",
        headers: config.headers,
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    createProduct: build.mutation({
      query: (product) => ({
        url: `/products`,
        method: "POST",
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Product"],
    }),

    createFile: build.mutation({
      query: (file) => ({
        url: "/products/file",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Customer"],
    }),

    getName: build.query({
      query: (name) => ({
        url: `/products/search?name=${name}`,
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetNameQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useCreateFileMutation
} = apiProduct;
