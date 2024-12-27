import { baseApi } from "../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: "/user/profile-image",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useUpdateProfileImageMutation } =
  profileApi;
