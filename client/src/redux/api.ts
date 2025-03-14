import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeminApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: () => `pokemon`,
    }),
  }),
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `users`,
      providesTags: ["User"],
    }),
    newUser: builder.mutation({
      query: (body) => ({ url: "users", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokeminApi;
export const { useGetUserQuery, useNewUserMutation } = userApi;
