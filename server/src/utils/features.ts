import { nodeCache } from "../index.js";
import { Product } from "../models/product.models.js";
import { InvalidateCacheProps, OrderItem } from "../types/types.js";
import { ErrorHandler } from "./errorHandler.js";

export const invalidateCache = async ({
  orders,
  products,
  admin,
}: InvalidateCacheProps) => {
  if (products) {
    const productKeys: string[] = [
      "latestProducts",
      "allProducts",
      "categories",
    ];
    const ids = await Product.find({}).select("_id");

    ids.forEach(({ _id }) => {
      productKeys.push(`product-${_id}`);
    });

    nodeCache.del(productKeys);
  }
  if (orders) {
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItem[]) => {
  orderItems.map(async (order) => {
    const product = await Product.findById(order.productId);
    if (!product) throw new ErrorHandler("Product not found", 400);
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
