import { useGetProductByIdQuery } from "@/redux/products/productsApi";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ManageProductPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [productItem, setProductItem] = useState<Product | undefined>(
    location.state as Product | undefined
  );

  // Only fetch if we don't have the product from location.state
  const { data, isLoading, isSuccess } = useGetProductByIdQuery(
    { productId: productId! },
    { skip: !!productItem }
  );

  useEffect(() => {
    // If we have location state, use it
    if (location.state) {
      setProductItem(location.state as Product);
    }
    // If we've successfully fetched data and don't have product yet, use the fetched data
    else if (isSuccess && data) {
      setProductItem(data);
    }
  }, [location.state, isSuccess, data]);

  console.log(productItem);

  return <div>ManageProductPage for {productId}</div>;
};

export default ManageProductPage;
