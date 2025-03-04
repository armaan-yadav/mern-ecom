export interface Order {
  _id: string;
  date: string;
  orderStatus: string;
  shippingAddress: string;
  amount: string;
  products: {
    productId: string;
    thumbnailUrl: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  productQuantity: string;
  customerId: string;
  paymentStatus: string;
  paymentMethod: string;
  transactionId: string;
  estimatedDelivery: string;
}
