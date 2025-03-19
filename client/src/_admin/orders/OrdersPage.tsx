import { table } from "console";
import { columns, Payment } from "./Columns";
import { DataTable } from "./DataTable";
import { DataTablePagination } from "./Pagination";

const OrdersPage = () => {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "michael@example.com",
    },
    {
      id: "83cf32a1",
      amount: 125.99,
      status: "completed",
      email: "sarah@gmail.com",
    },
    {
      id: "a5e78f23",
      amount: 59.99,
      status: "completed",
      email: "john.doe@example.org",
    },
    {
      id: "b6f91c4d",
      amount: 299.5,
      status: "failed",
      email: "robert@company.co",
    },
    {
      id: "d7e45a2b",
      amount: 149.99,
      status: "processing",
      email: "jennifer@mail.net",
    },
    {
      id: "f8d23c7e",
      amount: 75.5,
      status: "refunded",
      email: "david@example.com",
    },
    {
      id: "12ab34cd",
      amount: 199.99,
      status: "pending",
      email: "emma@business.org",
    },
    {
      id: "56ef78gh",
      amount: 89.95,
      status: "completed",
      email: "alex@startup.co",
    },
    {
      id: "90ij12kl",
      amount: 250,
      status: "processing",
      email: "lisa@example.net",
    },
    {
      id: "34mn56op",
      amount: 45.75,
      status: "completed",
      email: "kevin@gmail.com",
    },
    {
      id: "78qr90st",
      amount: 399.99,
      status: "pending",
      email: "maria@company.com",
    },
    // 20 additional payments
    {
      id: "54uv76wx",
      amount: 175.5,
      status: "completed",
      email: "thomas@example.net",
    },
    {
      id: "98yz12ab",
      amount: 79.99,
      status: "failed",
      email: "jessica@mail.org",
    },
    {
      id: "34cd56ef",
      amount: 299.99,
      status: "processing",
      email: "daniel@startup.io",
    },
    {
      id: "78gh90ij",
      amount: 129.5,
      status: "refunded",
      email: "natalie@example.com",
    },
    {
      id: "12kl34mn",
      amount: 225,
      status: "completed",
      email: "chris@business.net",
    },
    {
      id: "56op78qr",
      amount: 85.25,
      status: "pending",
      email: "amanda@gmail.com",
    },
    {
      id: "90st12uv",
      amount: 349.99,
      status: "completed",
      email: "brian@company.org",
    },
    {
      id: "34wx56yz",
      amount: 65.75,
      status: "processing",
      email: "michelle@mail.co",
    },
    {
      id: "78ab90cd",
      amount: 199.5,
      status: "failed",
      email: "steven@example.net",
    },
    {
      id: "12ef34gh",
      amount: 119.99,
      status: "completed",
      email: "rachel@startup.com",
    },
    {
      id: "56ij78kl",
      amount: 259.75,
      status: "pending",
      email: "jason@business.co",
    },
    {
      id: "90mn12op",
      amount: 45.5,
      status: "refunded",
      email: "elizabeth@gmail.com",
    },
    {
      id: "34qr56st",
      amount: 329.99,
      status: "completed",
      email: "matthew@example.org",
    },
    {
      id: "78uv90wx",
      amount: 159.95,
      status: "processing",
      email: "laura@company.net",
    },
    {
      id: "12yz34ab",
      amount: 79.5,
      status: "pending",
      email: "andrew@mail.io",
    },
    {
      id: "56cd78ef",
      amount: 175.25,
      status: "completed",
      email: "nicole@example.com",
    },
    {
      id: "90gh12ij",
      amount: 89.99,
      status: "failed",
      email: "eric@startup.org",
    },
    {
      id: "34kl56mn",
      amount: 219.5,
      status: "processing",
      email: "stephanie@business.net",
    },
    {
      id: "78op90qr",
      amount: 135.75,
      status: "completed",
      email: "brandon@gmail.com",
    },
    {
      id: "12st34uv",
      amount: 269.99,
      status: "pending",
      email: "katherine@example.co",
    },
  ] as Payment[];
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OrdersPage;
