import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Props = {
  productId: string;
  title: string;
  price: string;
  inStock: boolean;
  category: string;
  thumbnailUrl: string;
  handler?: () => void;
};
const ProductCard = ({
  inStock,
  price,
  productId,
  thumbnailUrl,
  title,
  category,
  handler,
}: Props) => {
  return (
    <Card className="w-[300px] group relative  overflow-hidden py-2 pb-0">
      <figure className="group-hover:opacity-90">
        <img
          className="aspect-square w-full"
          src={thumbnailUrl}
          width={300}
          height={500}
        />
      </figure>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg">
              <Link to={"/"}>
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <p className="text-lg font-semibold">₹{price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t h-full bg-[#f1f1f1]">
        <Button variant="ghost" className="w-full" onClick={handler}>
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
