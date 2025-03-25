import { IOrder } from "@/types";
import { MessageResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/orders`,
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query<IOrder[], { adminId: string }>({
      query: ({ adminId }) => ({ url: "all", params: { adminId } }),
      transformResponse: (response: MessageResponse<IOrder[]>) => {
        return response.data as IOrder[];
      },
    }),
    getOrderById: builder.query<IOrder, { orderId: string }>({
      query: ({ orderId }) => ({ url: orderId }),
      transformResponse: (response: MessageResponse<IOrder>) => {
        return response.data as IOrder;
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery } = orderApi;
export default orderApi;
