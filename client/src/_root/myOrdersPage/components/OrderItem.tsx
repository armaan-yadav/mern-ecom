import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import {
  Package,
  Truck,
  CreditCard,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  // Format date for better readability
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  // Calculate total items in the order
  const totalItems = order.products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold text-lg">
              Order #{order._id.slice(-6)}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(order.date)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : order.orderStatus === "Processing"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard size={16} className="text-gray-500" />
              <span className="font-medium">Payment:</span>
              <span
                className={`${
                  order.paymentStatus === "Paid"
                    ? "text-green-600"
                    : order.paymentStatus === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {order.paymentStatus}
              </span>
              <span className="text-gray-500">via {order.paymentMethod}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Package size={16} className="text-gray-500" />
              <span className="font-medium">Items:</span>
              <span>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
              <span className="text-gray-500">
                ({order.products.length}{" "}
                {order.products.length === 1 ? "product" : "products"})
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Truck size={16} className="text-gray-500" />
              <span className="font-medium">Delivery:</span>
              <span>{formatDate(order.estimatedDelivery)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-medium">Amount:</span>
              <span className="font-semibold">
                ${Number(order.amount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Products preview - show first product and count */}
        {order.products.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                {order.products[0].thumbnailUrl && (
                  <img
                    src={order.products[0].thumbnailUrl}
                    alt={order.products[0].name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium truncate">
                  {order.products[0].name}
                </div>
                <div className="text-sm text-gray-500">
                  ${order.products[0].price.toFixed(2)} ×{" "}
                  {order.products[0].quantity}
                </div>
              </div>
              {order.products.length > 1 && (
                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  +{order.products.length - 1} more
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-4 flex justify-end">
        <Link to={`/my-orders/${order._id}`} state={{ orderData: order }}>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1"
          >
            View Details
            <ChevronRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;
