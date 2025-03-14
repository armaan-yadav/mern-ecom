import { User } from "@/types";
import { MessageResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<MessageResponse<User>, User>({
      // Don't use "/create-user" as it will be treated as an absolute path
      query: (user) => ({ url: "create-user", method: "POST", body: user }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
