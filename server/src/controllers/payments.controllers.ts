import { createHmac } from "crypto";
import razorpay from "../config/razorpay.config.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { Product } from "../models/product.models.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { responseHandler } from "../utils/features.js";

export const createOrder = tryCatch(async (req, res, next) => {
  const { productId, quantity } = req.body;

  console.log(req.body);

  if (!productId || !quantity)
    throw new ErrorHandler("All fields  are required", 400);

  //get amount from db using product id

  const product = await Product.findById(productId);
  if (!product) throw new ErrorHandler("Invalid product id", 400);

  const options = {
    amount: product.price * quantity * 100,
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);
  return responseHandler(res, 201, "Order created successfully", { order });
});
export const verifyPayment = tryCatch(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET!
  )
    .update(body.toString())
    .digest("hex");

  if (expectedSignature != razorpay_signature)
    throw new ErrorHandler("Unable to verify the paymennt", 404);

  return res.redirect(
    `http://localhost:5173/success-payment?reference=${razorpay_payment_id}`
  );
});
