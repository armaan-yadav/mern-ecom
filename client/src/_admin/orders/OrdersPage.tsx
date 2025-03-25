import { useAppSelector } from "@/hooks/hooks";
import { useGetAllOrdersQuery } from "@/redux/order/OrderApi";
import { orderTableColumns } from "./OrderTableColumns";
import { DataTable } from "../../components/admin/tables/DataTable";

const OrdersPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const { isLoading, data, isSuccess } = useGetAllOrdersQuery({
    adminId: user?._id!,
  });

  if (isLoading) {
    <div>Loading..</div>;
  }

  return (
    <div>
      {isSuccess && <DataTable columns={orderTableColumns} data={data} />}
    </div>
  );
};

export default OrdersPage;
