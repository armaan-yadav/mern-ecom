import { IOrder, Product } from "@/types";
import { dashboardStatsResponse, MessageResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    getStats: builder.query<MessageResponse<dashboardStatsResponse>, void>({
      query: () => `dashboard/stats`,
    }),
    getOrderStats: builder.query<MessageResponse<any>, void>({
      query: () => `dashboard/stats-orders`,
    }),
    getAllOrders: builder.query<IOrder[], { adminId: string }>({
      query: ({ adminId }) => ({ url: "orders/all", params: { adminId } }),
      transformResponse: (response: MessageResponse<IOrder[]>) => {
        return response.data as IOrder[];
      },
    }),
    getAllProducts: builder.query<Product[], { adminId: string }>({
      query: ({ adminId }) => ({
        url: "products/admin-products",
        params: { adminId },
      }),
      transformResponse: (response: MessageResponse<Product[]>) => {
        return response.data as Product[];
      },
    }),
  }),
});

export const {
  useGetOrderStatsQuery,
  useGetStatsQuery,
  useGetAllProductsQuery,
} = adminApi;
export default adminApi;
