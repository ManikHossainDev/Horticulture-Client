import { baseApi } from '../api/baseApi';

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: '/faq',
        method: 'GET',
      }),
    }),
  }),
});

export  const { useGetFaqQuery } = faqApi;