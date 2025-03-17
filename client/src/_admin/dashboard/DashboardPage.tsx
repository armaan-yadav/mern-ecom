import AdminDashboardCard from "@/components/admin/AdminDashboardCard";
import AdminDashboardOrdersChart from "@/components/admin/AdminDashboardOrdersChart";
import AdminDashboardRevenueChart from "@/components/admin/AdminDashboardRevenueChart";

import AdminDashboardCardShimmer from "@/components/shimmer/AdminDashboardCardShimmer";
import {
  useGetOrderStatsQuery,
  useGetStatsQuery,
} from "@/redux/admin/adminsApi";
import { BadgeIndianRupee, ShoppingBag, Users } from "lucide-react";

const DashboardPage = () => {
  const {
    data,
    error,
    isLoading: isStatsLoading,
    isSuccess,
    isError,
  } = useGetStatsQuery();

  const { data: orderStats, isSuccess: isOrderStatsLoaded } =
    useGetOrderStatsQuery();
  if (isStatsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-full px-4">
      {isStatsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <AdminDashboardCardShimmer key={i} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          <AdminDashboardCard
            icon={BadgeIndianRupee}
            percentage={data?.data?.percentage.revenuePercentage!}
            title="Total Revenue"
            value={`₹${data?.data?.revenue.thisMonthRevenue || "0"}`}
          />
          <AdminDashboardCard
            icon={ShoppingBag}
            percentage={data?.data?.percentage.ordersPercentage!}
            title="Total Orders"
            value={`${data?.data?.count.ordersCount}`}
          />
          <AdminDashboardCard
            icon={Users}
            percentage={data?.data?.percentage.usersPercentage!}
            title="Total Users"
            value={`${data?.data?.count.usersCount}`}
          />
          <AdminDashboardCard
            icon={ShoppingBag}
            percentage={data?.data?.percentage.productsPercentage!}
            title="Total Products"
            value={`${data?.data?.count.productsCount}`}
          />
        </div>
      )}

      <div className="w-full flex gap-8">
        <AdminDashboardRevenueChart data={data?.data?.chart!} />
        {isOrderStatsLoaded && (
          <AdminDashboardOrdersChart data={orderStats.data} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
