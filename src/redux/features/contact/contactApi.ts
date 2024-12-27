import { baseApi } from "../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    contactToAdmin: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useContactToAdminMutation } = contactApi;
