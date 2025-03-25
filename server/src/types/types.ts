import { BlobOptions } from "buffer";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}

export interface InvalidateCacheProps {
  products?: boolean;
  orders?: boolean;
  admin?: boolean;
  userId?: string;
}


export interface IOrder {
  _id?: Types.ObjectId;
  shippingInfo: {
    address: string;
    pinCode: number;
    city: string;
    state: string;
  };
  user: string;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  orderItems: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  name: string;
  price: string;
  photo: string;
  quantity: number;
  productId: Types.ObjectId;
}
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

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female";
  photo: string;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //virtual attributes
  age: number;
}
