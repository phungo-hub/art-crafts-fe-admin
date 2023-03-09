import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
};

export const apiCategory = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8002/api" }),
  reducerPath: "categoryApi",
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => {
        return {
          url: "/categories",
          method: "GET",
          headers: config.headers,
        };
      },
      providesTags: ["Category"],
    }),

    updateCategory: build.mutation({
      query: (category) => ({
        url: `/categories`,
        method: "PUT",
        headers: config.headers,
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    createCategory: build.mutation({
      query: (category) => ({
        url: `/categories`,
        method: "POST",
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Category"],
    }),

     getNameCategory: build.query({
      query: (name) => ({
        url: `/categories/search?name=${name}`,
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Category"],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useGetNameCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,

} = apiCategory;
