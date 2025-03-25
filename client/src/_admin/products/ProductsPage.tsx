import { DataTable } from "@/components/admin/tables/DataTable";
import { useGetAllProductsQuery } from "@/redux/admin/adminApi";
import { productTableColumns } from "./ProductsTableColumns";

const ProductsPage = () => {
  const { data, isLoading, isSuccess } = useGetAllProductsQuery({
    adminId: "abc",
  });

  return (
    <div>
      {isSuccess && <DataTable columns={productTableColumns} data={data} />}
    </div>
  );
};

export default ProductsPage;
