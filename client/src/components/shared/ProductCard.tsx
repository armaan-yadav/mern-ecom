import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { ShoppingCart, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
  handler?: () => void;
};

const ProductCard = ({ handler, product }: Props) => {
  const { name, category, price, photo } = product;

  return (
    <Card className="w-full h-full flex flex-col relative overflow-hidden py-0 shadow-sm hover:shadow-lg transition-all duration-300 border-gray-200">
      <Link to={"/"} className="absolute inset-0 z-10">
        <span className="sr-only">{name}</span>
      </Link>

      <figure className="h-48 xs:h-52 sm:h-56 md:h-60 overflow-hidden bg-[#f8f8f8] p-4">
        <img
          className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
          src={photo}
          alt={name}
          loading="lazy"
        />
      </figure>

      <CardContent className="px-3 sm:px-4 pt-3 pb-2 flex-grow">
        <div className="flex flex-col">
          <h3 className="text-sm sm:text-base font-medium line-clamp-2 text-[#0F1111] mb-1 relative z-20 pointer-events-none">
            {name}
          </h3>

          <div className="relative z-20 pointer-events-none">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-medium text-[#B12704]">
                ₹{price}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-1.5">{category}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0 pt-1 border-t border-gray-100 mt-auto relative z-20 pointer-events-auto">
        <Button
          variant="ghost"
          className="w-full h-10 sm:h-11 rounded-none hover:bg-[#FFD814]/10 bg-[#FFD814] text-black border-[#FCD200] font-medium"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handler && handler();
          }}
        >
          <ShoppingCart className="size-3.5 sm:size-4 mr-1.5" strokeWidth={2} />
          <span className="text-sm">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
