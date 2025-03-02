import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

interface OrderDetailsPageProps {
  order?: Order;
  onBack?: () => void;
}

const OrderDetailsPage = ({
  order: propOrder,
  onBack,
}: OrderDetailsPageProps) => {
  const location = useLocation();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | undefined>(propOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Use order from props, location state, or fetch it
  useEffect(() => {
    const fetchOrder = async () => {
      // If we already have the order from props, don't fetch
      if (propOrder) {
        setOrder(propOrder);
        return;
      }

      // Check if order data is in location state
      const stateOrderData = location.state?.orderData;
      if (stateOrderData) {
        setOrder(stateOrderData);
        return;
      }

      // Only fetch if we have an orderId and no order yet
      if (orderId) {
        setLoading(true);
        setError(null);
        try {
          // Mock fetch - replace with actual API call
          // const response = await fetch(`/api/orders/${orderId}`);
          // if (!response.ok) throw new Error("Failed to fetch order");
          // const data = await response.json();
          // setOrder(data);

          // For now, just set error since we're not implementing the actual fetch
          setError("Order fetching not implemented");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load order");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No order ID provided");
      }
    };

    fetchOrder();
  }, [propOrder, location.state, orderId]);

  // Handle back button click
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/my-orders");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-64">
        <Package size={48} className="text-gray-300 mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold mb-2">Loading order...</h2>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-64">
        <Package size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Unable to load order</h2>
        <p className="text-gray-500 mb-4">{error}</p>
        <Button onClick={handleBack}>Back to Orders</Button>
      </div>
    );
  }

  // Show not found state
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-64">
        <Package size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Order not found</h2>
        <p className="text-gray-500 mb-4">
          The order you're looking for doesn't exist or has been removed
        </p>
        <Button onClick={handleBack}>Back to Orders</Button>
      </div>
    );
  }

  // Format date safely
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid date"; // Clearer error message for invalid dates
    }
  };

  // Calculate order totals safely
  const subtotal =
    order.products?.reduce(
      (sum, product) => sum + (product.price || 0) * (product.quantity || 1),
      0
    ) || 0;

  const orderAmount = Number(order.amount) || 0;
  // Ensure shipping doesn't become negative due to calculation errors
  const shipping = Math.max(0, orderAmount - subtotal);

  // Get status color
  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <Badge variant="outline" className="text-gray-500 border-gray-300">
            ID: {order._id || "N/A"}
          </Badge>
          <Badge className={getStatusColor(order.orderStatus)}>
            {order.orderStatus || "Unknown"}
          </Badge>
        </div>
      </div>

      {/* Order summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag size={18} />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Order Date</span>
                <span className="font-medium">{formatDate(order.date)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Estimated Delivery</span>
                <span className="font-medium">
                  {formatDate(order.estimatedDelivery)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Items</span>
                <span className="font-medium">
                  {order.products?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-semibold">${orderAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard size={18} />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium">
                  {order.paymentMethod || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Payment Status</span>
                <span
                  className={`font-medium ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : order.paymentStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium text-xs bg-gray-100 px-2 py-1 rounded">
                  {order.transactionId || "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipping address */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin size={18} />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-sm">
            {order.shippingAddress || "No shipping address provided"}
          </p>
        </CardContent>
      </Card>

      {/* Products list */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package size={18} />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.products && order.products.length > 0 ? (
              order.products.map((product, index) => (
                <React.Fragment key={`${product.productId || index}-${index}`}>
                  {index > 0 && <Separator />}
                  <div className="flex items-start py-3">
                    <div className="h-20 w-20 rounded bg-gray-100 flex-shrink-0 overflow-hidden mr-4">
                      {product.thumbnailUrl && (
                        <img
                          src={product.thumbnailUrl}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {product.name || "Unnamed Product"}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        Product ID: {product.productId || "N/A"}
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Qty: </span>
                          <span>{product.quantity || 1}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 mr-2">
                            ${(product.price || 0).toFixed(2)} ×{" "}
                            {product.quantity || 1}
                          </span>
                          <span className="font-semibold">
                            $
                            {(
                              (product.price || 0) * (product.quantity || 1)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div className="py-6 text-center text-gray-500">
                No products in this order
              </div>
            )}
          </div>

          {/* Order total */}
          <div className="mt-6 pt-6 border-t">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span>${orderAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <User size={18} />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <span className="text-gray-500">Customer ID: </span>
            <span>{order.customerId || "N/A"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
