import { baseApi } from "../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: "/settings/about-us",
        method: "GET",
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/settings/privacy-policy",
        method: "GET",
      }),
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/settings/terms-conditions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
} = settingsApi;
