import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnTitle } from "@/components/admin/tables/TableHeader";

export const orderTableColumns: ColumnDef<IOrder>[] = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return parseInt(row.id) + 1;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => <ColumnTitle column={column} title="Date" />,
    cell: ({ row }) => {
      const order = row.original;
      const date = new Date(order.createdAt);
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date);
      return formatted;
    },
  },
  {
    accessorKey: "user",
    header: "Customer Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return user?.name;
    },
  },
  {
    accessorKey: "orderItems",
    header: "Item(s)",
    cell: ({ row }) => {
      const orderItems = row.original.orderItems;
      return (
        <div className="flex flex-col gap-2">
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-8 h-8 object-cover rounded"
                />
                <span>{item.name}</span>
              </div>
              <div> x {item.quantity}</div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "shippingInfo",
    header: "Address",
    cell: ({ row }) => {
      const shippingInfo = row.original.shippingInfo;

      return `${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <ColumnTitle column={column} title="Total" />;
    },
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-IN", {
        currency: "INR",
        style: "currency",
        maximumFractionDigits: 0,
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
            status == "delivered"
              ? "bg-green-500"
              : status === "processing"
              ? "bg-yellow-500"
              : status === "cancelled"
              ? "bg-red-500"
              : ""
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      console.log(order._id);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order._id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
