import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaHUiLCJpYXQiOjE2Nzc2ODUzODUsImV4cCI6MTY3ODI5MDE4NX0.ziqtu9BruaoxJ7RD3T093jxuzN3IICZ6SLHn0yAqvPVEIhzX1cqQ3WL6P-8n_Wx8sfqwa53kFm-QRyTiQd1rEw`,
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
  }),
});
export const { useGetUserQuery } = api;