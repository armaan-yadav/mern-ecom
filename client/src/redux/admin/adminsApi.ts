import { dashboardStatsResponse, MessageResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/dashboard`,
  }),
  endpoints: (builder) => ({
    getStats: builder.query<MessageResponse<dashboardStatsResponse>, void>({
      query: () => `stats`,
    }),
    getOrderStats: builder.query<MessageResponse<any>, void>({
      query: () => `stats-orders`,
    }),
  }),
});

export const { useGetOrderStatsQuery, useGetStatsQuery } = adminApi;
export default adminApi;
