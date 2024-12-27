import { baseApi } from "../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: (sessionId: string) => ({
        url: `/order/success-payment?session_id=${sessionId}`,
        method: "POST",
      }),
    }),
    getUserOrder: builder.query({
      query: () => ({
        url: "/order/get-user-orders",
        method: "GET",
      }),
      
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetUserOrderQuery,
} = orderApi;
