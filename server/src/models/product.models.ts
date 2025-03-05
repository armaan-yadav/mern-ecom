import { kStringMaxLength } from "buffer";
import mongoose from "mongoose";

export interface IProduct {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  inStock: boolean;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    photo: { type: String, required: [true, "Product photo is required"] },
    price: { type: Number, required: [true, "Product price is required"] },
    stock: { type: Number, required: [true, "Product stock is required"] },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    inStock: {
      type: Boolean,
      required: [true, "Product inStock status is required"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
