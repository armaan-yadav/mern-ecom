export interface User {
  _id: string;
  name: string;
  phone?: string;
  email: string;
  role?: "admin" | "user";
  gender?: "male" | "female";
  dob?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  _id: string;
  shippingInfo: {
    address: string;
    pinCode: number;
    city: string;
    state: string;
  };
  user: { id: string; name: string };
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  orderItems: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  name: string;
  price: string;
  photo: string;
  quantity: number;
  productId: string;
}
