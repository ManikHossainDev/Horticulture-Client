import { RootState } from "@/redux/store";
import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

// Define a base query that accesses the Redux state for the token
const baseQuery = fetchBaseQuery({
  baseUrl: `https://api.hortspec.com/api/v1`,
  // baseUrl: `http://192.168.10.163:7575/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Enhanced base query with token refresh logic
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle various error statuses
  if (result?.error?.status === 404) {
    toast.error(
      (result.error.data as { message: string })?.message || "Not Found"
    );
  }
  if (result?.error?.status === 403) {
    toast.error(
      (result.error.data as { message: string })?.message || "Forbidden"
    );
  }
  if (result?.error?.status === 409) {
    toast.error(
      (result.error.data as { message: string })?.message || "Conflict"
    );
  }
  if (result?.error?.status === 401) {
    console.log('unauthorized');
    // window.location.href = "/login";
  }

  return result;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["company"],
  endpoints: () => ({}),
});
