import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { uploadImageToCloudinary } from "@/lib/utils";
import { useEditProductMutation } from "@/redux/admin/adminApi";
import {
  useGetAllCategoriesQuery,
  useGetProductByIdQuery,
} from "@/redux/products/productsApi";
import { Product } from "@/types";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ManageProductPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [productItem, setProductItem] = useState<Product | undefined>(
    location.state as Product | undefined
  );
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>();
  const [localUrl, setLocalUrl] = useState<string>();
  const ref = useRef<HTMLInputElement>(null);
  const { data: categories } = useGetAllCategoriesQuery();

  const { data, isSuccess } = useGetProductByIdQuery(
    { productId: productId! },
    { skip: !!productItem }
  );

  const [editProduct, { isLoading, isSuccess: isEdited, data: editData }] =
    useEditProductMutation();

  useEffect(() => {
    if (location.state) {
      const productFromState = location.state.product as Product;
      setProductItem(productFromState);
      setCurrentCategory(productFromState?.category || "");
      console.log("State category:", productFromState?.category);
    } else if (isSuccess && data) {
      setProductItem(data);
      setCurrentCategory(data.category || "");
      console.log("API category:", data.category);
    }
  }, [location.state, isSuccess, data]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setLocalUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  if (!productItem)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProduct: {
      name: FormDataEntryValue | null;
      price: number | null;
      stock: number | null;
      category: string | undefined;
      inStock: boolean;
      photo?: string;
    } = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: currentCategory,
      inStock: !!formData.get("availability"),
    };

    try {
      if (image) {
        const url = await uploadImageToCloudinary(image);
        updatedProduct.photo = url!;
      }

      console.log(updatedProduct);

      await editProduct({
        id: productId!,
        data: updatedProduct as Partial<Product>,
      }).unwrap();

      if (isEdited) {
        console.log("Product updated successfully", editData);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Card className="max-w-5xl mx-auto my-8 shadow-md">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-bold">
          Edit Product: {productItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name
              </Label>
              <Input
                name="name"
                defaultValue={productItem?.name}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Price ($)
              </Label>
              <Input
                name="price"
                defaultValue={productItem?.price}
                className="w-full"
                type="number"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-sm font-medium">
                Stock
              </Label>
              <Input
                name="stock"
                defaultValue={productItem?.stock}
                className="w-full"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              {categories && (
                <Select
                  value={currentCategory}
                  onValueChange={(e) => {
                    console.log("Selected category:", e);
                    setCurrentCategory(e);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category">
                      {currentCategory}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category, index) => (
                        <SelectItem value={category || "something"} key={index}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Label htmlFor="availability" className="text-sm font-medium">
                Availability
              </Label>
              <Switch
                name="availability"
                defaultChecked={productItem.inStock}
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="border rounded-md overflow-hidden w-full max-w-xs h-64 flex items-center justify-center bg-gray-50">
              {productItem.photo ? (
                <img
                  src={localUrl ? localUrl : productItem.photo}
                  alt={productItem.name}
                  className="object-contain max-h-full max-w-full"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full max-w-xs"
              onClick={() => ref.current?.click()}
            >
              Change Image
            </Button>
            <input
              type="file"
              className="hidden"
              ref={ref}
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <Button className="px-8" size="lg" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageProductPage;
