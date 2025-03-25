import mongoose, { Types } from "mongoose";
import { User } from "./user.models.js";
import { IOrder } from "../types/types.js";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Shipping address is required"],
      },
      pinCode: {
        type: Number,
        required: [true, "Shipping pin code is required"],
      },
      city: {
        type: String,
        required: [true, "Shipping city is required"],
      },
      state: {
        type: String,
        required: [true, "Shipping state is required"],
      },
    },

    user: {
      type: String,
      required: [true, "User id is required"],
      ref: User, /// kis collection se reference  dena hai
    },

    subTotal: {
      type: Number,
      required: [true, "subtotal is required"],
    },
    tax: {
      type: Number,
      required: [true, "tax is required"],
    },
    shippingCharges: {
      type: Number,
      default: 0,
      required: [true, "shippingCharges is required"],
    },
    discount: {
      type: Number,
      default: 0,
      required: [true, "discount is required"],
    },
    total: {
      type: Number,
      required: [true, "total is required"],
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },

    orderItems: [
      {
        name: String,
        price: String,
        photo: String,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
