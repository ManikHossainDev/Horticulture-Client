import { baseApi } from "../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => `/subscription`,
    }),
    purchaseSubscription: builder.mutation({
      query: (data) => ({
        url: `/subscription/purchase-subscription`,
        method: "POST",
        body: data,
      }),
    }),
    completeSubscriptionPayment: builder.mutation({
      query: (data) => ({
        url: `/subscription/complete-subscription-payment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  usePurchaseSubscriptionMutation,
  useCompleteSubscriptionPaymentMutation,
} = subscriptionApi;
