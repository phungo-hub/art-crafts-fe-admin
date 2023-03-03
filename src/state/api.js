import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaHUiLCJpYXQiOjE2Nzc4MTMzNjcsImV4cCI6MTY3ODQxODE2N30.fpl-HJ7Y0-b8NiE7w-phZgHKmecc_oWu123TiLJ2d127V1Ox3QPBkw1rAM7kLTMPkYkwsl9581LCsyuliswjNg`,
  },
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api"
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
      query: ( id ) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, useCreateUserMutation } = api;
