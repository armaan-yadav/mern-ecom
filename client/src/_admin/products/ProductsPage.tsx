import { DataTable } from "@/components/admin/tables/DataTable";
import { useGetAllProductsQuery } from "@/redux/admin/adminApi";
import { productTableColumns } from "./ProductsTableColumns";
import { useGetAllCategoriesQuery } from "@/redux/products/productsApi";

const ProductsPage = () => {
  const { data: products, isSuccess } = useGetAllProductsQuery({
    adminId: "abc",
  });

  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <div>
      {isSuccess && <DataTable columns={productTableColumns} data={products} />}
    </div>
  );
};

export default ProductsPage;
