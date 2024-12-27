import { baseApi } from "../api/baseApi";

type LoginRequest = { email: string; password: string };
type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};
type ForgotPasswordRequest = { email: string };
type VerifyEmailRequest = { email: string; oneTimeCode: string };
type ResetPasswordRequest = { email: string; newPassword: string };
type ChangePasswordRequest = { currentPassword: string; newPassword: string };

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData: LoginRequest) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    register: builder.mutation({
      query: (registerData: RegisterRequest) => ({
        url: "/auth/register",
        method: "POST",
        body: registerData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (forgotPasswordData: ForgotPasswordRequest) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (verifyEmailData: VerifyEmailRequest) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: verifyEmailData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetPasswordData: ResetPasswordRequest) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    changePassword: builder.mutation({
      query: (changePasswordData: ChangePasswordRequest) => ({
        url: "/auth/change-password",
        method: "POST",
        body: changePasswordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authApi;
