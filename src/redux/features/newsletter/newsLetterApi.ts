import { baseApi } from "../api/baseApi";

const newsLetterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinNewsLetter: builder.mutation({
      query: (data) => ({
        url: `/newsletter`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useJoinNewsLetterMutation } = newsLetterApi;
