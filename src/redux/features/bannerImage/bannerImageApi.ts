import { baseApi } from "../api/baseApi";

const bannerImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBannerImages: builder.query({
      query: () => ({
        url: "/bannerImage",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBannerImagesQuery } = bannerImageApi;
