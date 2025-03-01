import React, { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  price: string;
  quantity: string;
  thumbnailUrl: string;
  size: string;
  inStock: boolean;
  color: string;
};

const CartItem = ({
  color,
  inStock,
  price,
  quantity,
  size,
  thumbnailUrl,
  title,
}: Props) => {
  const [quant, setQuant] = useState(parseInt(quantity));

  const inc = () => {
    setQuant((prev) => prev + 1);
  };
  const dec = () => {
    if (quant >= 1) {
      setQuant((prev) => prev - 1);
    }
  };
  return (
    <div className="border-[1px] border-black flex rounded-sm ">
      {/* image part */}
      <div className="">
        <img
          src={thumbnailUrl}
          className="aspect-square w-[110px] md:w-[150px]"
        />
      </div>
      {/* details wala part */}
      <div className="flex-1  ">
        <div className="">
          <h2 className="text-xl font-semibold">{title}</h2>
          <h3
            className={`font-semibold text-sm ${
              inStock ? "text-green-400" : "text-red-400"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </h3>
        </div>
        <div className="flex">
          <div className="flex-b gap-3 ">
            <div className="font-semibold">₹{price}</div>
            <div>
              <Button onClick={dec}>-</Button>
              {quant}
              <Button onClick={inc}>+</Button>
            </div>
          </div>
          <div className="font-bold">total : ₹{parseInt(price) * quant}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
