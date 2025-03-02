import { dummyOrders } from "@/constants/constants";
import OrderItem from "./components/OrderItem";

const MyOrdersPage = () => {
  return (
    <div className="h-screen px-2 md:px-4">
      <h1>My Orders </h1>

      <div className="flex flex-col gap-4 ">
        {dummyOrders.map((e) => (
          <OrderItem order={e} key={e._id} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
