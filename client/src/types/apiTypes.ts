export type MessageResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type dashboardStatsResponse = {
  percentage: {
    ordersPercentage: string;
    productsPercentage: string;
    usersPercentage: string;
    revenuePercentage: string;
  };
  count: {
    ordersCount: number;
    usersCount: number;
    productsCount: number;
  };
  revenue: {
    totalRevenue: number;
    thisMonthRevenue: number;
    prevMonthRevenue: number;
  };
  chart: { order: number[]; revenue: number[] };
};
