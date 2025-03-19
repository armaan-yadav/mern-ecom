import { Product } from "@/types";
import { MessageResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/products/`,
  }),
  endpoints: (builder) => ({
    getLatestProducts: builder.query<Product[], void>({
      query: () => "latest-products",
      transformResponse: (response: MessageResponse<{ products: Product[] }>) =>
        response.data?.products ?? [],
    }),
  }),
});

export const { useGetLatestProductsQuery } = productsApi;
