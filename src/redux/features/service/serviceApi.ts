import { baseApi } from '../api/baseApi';

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: '/service',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllServiceQuery } = serviceApi;
