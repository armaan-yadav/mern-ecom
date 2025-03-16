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
    getUser: builder.query<MessageResponse<User>, string>({
      query: (id) => id,
    }),
    updateUser: builder.mutation<
      MessageResponse<null>,
      { id: string; updatedFields: Partial<User> }
    >({
      query: ({ id, updatedFields }) => ({
        url: `${id}`,
        method: "PUT",
        body: { updatedFields },
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } =
  userApi;
