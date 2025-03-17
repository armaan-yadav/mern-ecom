import {
  BadgeIndianRupee,
  Box,
  Home,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";

import { Order } from "@/types";

export const brandName = "Some Brand";

export const cartItems = [
  {
    _id: "1",
    title: "Classic White T-Shirt",
    price: "300",
    quantity: "2",
    thumbnailUrl:
      "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/b/mbp-spacegray-select-202206-removebg-preview_1_.png",
    size: "M",
    inStock: true,
    color: "White",
  },
  {
    _id: "2",
    title: "Denim Jacket",
    price: "500",
    quantity: "1",
    thumbnailUrl:
      "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/b/mbp-spacegray-select-202206-removebg-preview_1_.png",
    size: "L",
    inStock: true,
    color: "Blue",
  },
  {
    _id: "3",
    title: "Running Shoes",
    price: "600",
    quantity: "3",
    thumbnailUrl:
      "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/b/mbp-spacegray-select-202206-removebg-preview_1_.png",
    size: "10",
    inStock: false,
    color: "Black",
  },
  {
    _id: "4",
    title: "Leather Wallet",
    price: "220",
    quantity: "4",
    thumbnailUrl:
      "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/b/mbp-spacegray-select-202206-removebg-preview_1_.png",
    size: "One Size",
    inStock: true,
    color: "Brown",
  },
  {
    _id: "5",
    title: "Cotton Hoodie",
    price: "400",
    quantity: "2",
    thumbnailUrl:
      "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/b/mbp-spacegray-select-202206-removebg-preview_1_.png",
    size: "XL",
    inStock: false,
    color: "Grey",
  },
];

export const dummyOrders: Order[] = [
  {
    _id: "ORD123456",
    date: "2025-03-01",
    orderStatus: "Shipped",
    shippingAddress: "123 Main St, Los Angeles, CA, USA",
    amount: "149.99",
    products: [
      {
        productId: "P001",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Wireless Headphones",
        price: 49.99,
        quantity: 2,
      },
      {
        productId: "P002",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Smartphone Case",
        price: 20.0,
        quantity: 1,
      },
    ],
    productQuantity: "3",
    customerId: "CUST001",
    paymentStatus: "Completed",
    paymentMethod: "Credit Card",
    transactionId: "TXN987654",
    estimatedDelivery: "2025-03-05",
  },
  {
    _id: "ORD123457",
    date: "2025-02-28",
    orderStatus: "Delivered",
    shippingAddress: "456 Elm St, New York, NY, USA",
    amount: "299.00",
    products: [
      {
        productId: "P003",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Laptop Bag",
        price: 59.99,
        quantity: 1,
      },
      {
        productId: "P004",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Mechanical Keyboard",
        price: 129.99,
        quantity: 1,
      },
      {
        productId: "P005",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Wireless Mouse",
        price: 39.99,
        quantity: 1,
      },
    ],
    productQuantity: "3",
    customerId: "CUST002",
    paymentStatus: "Completed",
    paymentMethod: "PayPal",
    transactionId: "TXN567890",
    estimatedDelivery: "2025-03-02",
  },
  {
    _id: "ORD123458",
    date: "2025-03-01",
    orderStatus: "Processing",
    shippingAddress: "789 Pine St, San Francisco, CA, USA",
    amount: "79.99",
    products: [
      {
        productId: "P006",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
      },
    ],
    productQuantity: "1",
    customerId: "CUST003",
    paymentStatus: "Pending",
    paymentMethod: "Apple Pay",
    transactionId: "TXN123456",
    estimatedDelivery: "2025-03-06",
  },
  {
    _id: "ORD123459",
    date: "2025-02-27",
    orderStatus: "Cancelled",
    shippingAddress: "567 Maple St, Chicago, IL, USA",
    amount: "199.99",
    products: [
      {
        productId: "P007",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Gaming Monitor",
        price: 199.99,
        quantity: 1,
      },
    ],
    productQuantity: "1",
    customerId: "CUST004",
    paymentStatus: "Refunded",
    paymentMethod: "Debit Card",
    transactionId: "TXN765432",
    estimatedDelivery: "N/A",
  },
  {
    _id: "ORD123460",
    date: "2025-03-02",
    orderStatus: "Pending",
    shippingAddress: "890 Birch St, Seattle, WA, USA",
    amount: "99.99",
    products: [
      {
        productId: "P008",
        thumbnailUrl: "https://via.placeholder.com/150",
        name: "Smart Watch",
        price: 99.99,
        quantity: 1,
      },
    ],
    productQuantity: "1",
    customerId: "CUST005",
    paymentStatus: "Pending",
    paymentMethod: "Google Pay",
    transactionId: "TXN246810",
    estimatedDelivery: "2025-03-08",
  },
];

export const AdminSidebarItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "products",
    icon: Box,
  },
  {
    title: "Inventory",
    url: "inventory",
    icon: Store,
  },
  {
    title: "Users",
    url: "users",
    icon: Users,
  },
  {
    title: "Orders",
    url: "orders",
    icon: ShoppingBag,
  },
  {
    title: "Coupons",
    url: "coupons",
    icon: BadgeIndianRupee,
  },
];
