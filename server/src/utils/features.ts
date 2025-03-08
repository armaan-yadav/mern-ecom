import { nodeCache } from "../index.js";
import { Product } from "../models/product.models.js";
import { InvalidateCacheProps, OrderItem } from "../types/types.js";
import { ErrorHandler } from "./errorHandler.js";

export const invalidateCache = async ({
  orders,
  products,
  admin,
  userId,
}: InvalidateCacheProps) => {
  if (products) {
    const productKeys: string[] = [
      "latestProducts",
      "allProducts",
      "categories",
    ];
    //  TODO  optimize the approach by providing the productId while deleting or editing a product
    const ids = await Product.find({}).select("_id");

    ids.forEach(({ _id }) => {
      productKeys.push(`product-${_id}`);
    });

    nodeCache.del(productKeys);
  }
  if (orders) {
    const orderKeys: string[] = ["all-orders", `myOrders-${userId}`];

    nodeCache.del(orderKeys);
  }
  if (admin) {
  }
  nodeCache.del("adminStats");
};

export const reduceStock = async (orderItems: OrderItem[]) => {
  orderItems.map(async (order) => {
    const product = await Product.findById(order.productId);
    if (!product) throw new ErrorHandler("Product not found", 404);
    const updatedStock = product?.stock! - order.quantity;
    await product?.updateOne({ stock: updatedStock });
  });
};

export const responseHandler = (
  res: any,
  statusCode: number,
  message: string,
  data?: {}
) => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const calculatePercentage = (
  thisMonth: number,
  prevMonth: number
): string => {
  if (prevMonth === 0) return thisMonth > 0 ? `+${thisMonth * 100}%` : "0%";
  const percent = ((thisMonth - prevMonth) / prevMonth) * 100;
  return `${percent > 0 ? "+" : ""}${percent.toFixed(0)}%`;
};
