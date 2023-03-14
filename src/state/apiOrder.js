import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
};
export const apiOrder = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://art-crafts-order-service.herokuapp.com" }),
  reducerPath: "orderApi",
  tagTypes: ["Order"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => {
        return {
          url: "/orders",
          method: "GET",
          headers: config.headers,
        };
      },
      providesTags: ["Order"],
    }),

    updateOrder: build.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "PUT",
        headers: config.headers,
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    createOrder: build.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        headers: config.headers,
        // headers: {
        //   ...config.headers,
        //   "Content-Type": "application/json",
        // },
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Order"],
    }),

    searchOrderByCustomerId: build.query({
      query: (id) => {
        return {
          url: `/orders/search?id=${id}`,
          method: "GET",
          headers: config.headers,
          // params: id
        };
      },
      providesTags: ["Order"],
    }),
  }),
});
export const {
  useGetOrdersQuery,
  useSearchOrderByCustomerIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateOrderMutation,
} = apiOrder;


export const apiOrderDetails = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8003/api" }),
  reducerPath: "orderDetailApi",
  tagTypes: ["OrderDetail"],
  endpoints: (build) => ({
    getOrderDetailByOrderId: build.query({
      query: (id) => {
        return {
          url: `/order-details/get/${id}`,
          method: "GET",
          headers: config.headers,
        };
      },
      providesTags: ["OrderDetail"],
    }),
  }),
});
export const {
  useGetOrderDetailByOrderIdQuery
} = apiOrderDetails;