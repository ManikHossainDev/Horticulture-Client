import { baseApi } from "../api/baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCompany: build.mutation({
      query: (data) => ({
        url: "/company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompany: build.query({
      query: ({
        page,
        searchTerm,
        companyType,
        city,
        state,
        zipCode,
        country,
      }) => {
        let params: Record<string, string> = {};
        if (page) {
          params.page = page;
        }
        if (searchTerm) {
          params.searchTerm = searchTerm;
        }
        if (companyType) {
          params.companyType = companyType;
        }
        if (city) {
          params.city = city;
        }
        if (state) {
          params.state = state;
        }
        if (zipCode) {
          params.zipCode = zipCode;
        }
        if (country) {
          params.country = country;
        }
        return {
          url: "/company",
          method: "GET",
          params,
        };
      },
      providesTags: ["company"],
    }),
    getSingleCompany: build.query({
      query: (id) => ({
        url: `/company/${id}`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    addCompanyReview: build.mutation({
      query: (data: {
        rating: number;
        comment: string;
        companyId: string;
      }) => ({
        url: "/companyReview",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    getMyCompany: build.query({
      query: () => ({
        url: "/company/my-company",
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    updateMyCompany: build.mutation({
      query: ({ id, data }) => ({
        url: `/company/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    deleteMyCompany: build.mutation({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
    updateCompanyImages: build.mutation({
      query: (data) => ({
        url: "/company/update-images",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    deleteCompanyImage: build.mutation({
      query: ({ companyId, imageName }) => ({
        url: `/company/delete-image?id=${companyId}&imageName=${imageName}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useAddCompanyReviewMutation,
  useGetMyCompanyQuery,
  useUpdateMyCompanyMutation,
  useDeleteMyCompanyMutation,
  useDeleteCompanyImageMutation,
  useUpdateCompanyImagesMutation,
} = companyApi;
