import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { Order } from "../models/order.models.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { invalidateCache, reduceStock, responseHandler, } from "../utils/features.js";
export const newOrder = tryCatch(async (req, res, next) => {
    const { shippingInfo, user, subTotal, tax, shippingCharges, discount, total, status, orderItems, } = req.body;
    if (!shippingCharges ||
        !shippingInfo ||
        !user ||
        !subTotal ||
        !tax ||
        !discount ||
        !total ||
        !status ||
        !orderItems) {
        throw new ErrorHandler("All fields are required", 400);
    }
    const order = await Order.create({
        shippingInfo,
        user,
        subTotal,
        tax,
        shippingCharges,
        discount,
        total,
        status,
        orderItems,
    });
    if (!order)
        throw new ErrorHandler("Error while  placing ordder, try again", 400);
    await reduceStock(orderItems);
    await invalidateCache({ products: true, orders: true, admin: true });
    return responseHandler(res, 201, "Order placed succesfully");
});
export const myOrders = tryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        throw new ErrorHandler("Invalid user id", 400);
    const orders = await Order.find({ user: id });
    if (!orders)
        throw new ErrorHandler("Some error while fetching orders", 500);
    return responseHandler(res, 200, `orders for id ${id} fetched successfully`, orders);
});
export const allOrders = tryCatch(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", ["name", "phone"]);
    if (!orders)
        throw new ErrorHandler("Error while fethcing order from db", 500);
    return responseHandler(res, 200, "All order fetched successfully", orders);
});
export const editOrder = tryCatch(async (req, res, next) => {
    const id = req.params.id;
    if (!id)
        throw new ErrorHandler("Invalid order id", 400);
    const { updatedFields } = req.body;
    if (!updatedFields)
        throw new ErrorHandler("updated fields not provided", 400);
    const order = await Order.findByIdAndUpdate(id, { ...updatedFields });
    if (!order)
        throw new ErrorHandler("No order exists with given id", 400);
    return responseHandler(res, 200, "order updated successfully");
});
export const deleteOrder = tryCatch(async (req, res, next) => {
    const id = req.params.id;
    if (!id)
        throw new ErrorHandler("Invalid order id", 400);
    const order = await Order.findByIdAndDelete(id);
    if (!order)
        throw new ErrorHandler(`no order exists with orderId ${id}`, 400);
    return responseHandler(res, 200, "order deleted successfully");
});
