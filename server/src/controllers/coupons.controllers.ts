import { nodeCache } from "../index.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { Coupon } from "../models/coupon.models.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { responseHandler } from "../utils/features.js";
import { newOrder } from "./orders.controllers.js";

//TODO cache coupons as well
export const newCoupon = tryCatch(async (req, res, next) => {
  const { coupon, amount, isActive } = req.body;
  if (!coupon || !amount)
    throw new ErrorHandler("All fields are required", 400);

  const c = await Coupon.create({ amount, coupon, isActive: true });

  if (!c)
    throw new ErrorHandler("Something went wrong while creating coupon", 500);

  return responseHandler(res, 201, `Coupon added successfullly`, c);
});

export const allCoupons = tryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({}).select([
    "coupon",
    "amount",
    "isActive",
  ]);

  if (!coupons)
    throw new ErrorHandler(
      "something went wrong while fethcing coupons. try again",
      500
    );

  return responseHandler(res, 200, "Coupons fetched successfully", coupons);
});

export const deleteCoupon = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  if (!id) throw new ErrorHandler("Invalid id", 400);

  const response = await Coupon.findByIdAndDelete(id);

  if (!response) throw new ErrorHandler("No coupon exists with such id", 404);

  return responseHandler(res, 200, "Coupon deleted successfully");
});

export const changeActiveStatus = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  if (!id) throw new ErrorHandler("Invalid id", 400);

  const coupon = await Coupon.findById(id);
  if (!coupon) throw new ErrorHandler("Coupon not found", 404);

  const newStatus = !coupon?.isActive;

  await coupon?.updateOne({ isActive: newStatus });

  return responseHandler(res, 200, `Coupon status changed to ${newStatus}`);
});

export const applyCoupon = tryCatch(async (req, res, next) => {
  const { coupon } = req.query;

  if (!coupon) throw new ErrorHandler("Coupon code not provided", 400);

  const dis = await Coupon.findOne({ coupon });

  if (!dis) throw new ErrorHandler("Invalid  coupon code", 400);

  return responseHandler(res, 200, `Coupon ${coupon} applied successfully`, {
    discount: dis.amount,
  });
});
