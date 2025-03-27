import { MoreHorizontal } from "lucide-react";

import { ColumnTitle } from "@/components/admin/tables/TableHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return parseInt(row.id) + 1;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnTitle column={column} title="Name" />,
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.photo}
          className="w-8 h-8 object-cover rounded"
        />
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnTitle column={column} title="Price" />,
    cell: ({ row }) => {
      const amount = row.original.price;
      const formatted = new Intl.NumberFormat("en-IN", {
        currency: "INR",
        maximumFractionDigits: 0,
        style: "currency",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <ColumnTitle column={column} title="Stock" />,
    cell: ({ row }) => {
      return row.original.stock;
    },
  },
  {
    accessorKey: "inStock",
    header: "Availability",
    cell: ({ row }) => {
      const inStock = row.original.inStock;
      return (
        <Switch
          id="inStock"
          checked={inStock}
          style={{ backgroundColor: inStock ? "#10B981" : "#EF4444" }}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const navigate = useNavigate();
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
              onClick={() => navigator.clipboard.writeText(product._id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate(`/admin/manage-product/${product._id}`, {
                  state: { product },
                });
              }}
            >
              Manage
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
