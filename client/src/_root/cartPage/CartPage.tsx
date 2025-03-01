import CartItem from "@/components/shared/CartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartItems } from "@/constants/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const validateCouponCode = () => {
    if (couponCode == "hello") {
      setIsValidCoupon(true);
    } else {
      setIsValidCoupon(false);
    }
  };

  return (
    <div className="bg-teal-200 min-h-screen md:flex">
      <main className="w-full md:w-2/3 lg:w-3/4 py-4">
        <div className=" rounded-lg shadow p-6 bg-white">
          {/* Cart content goes here */}
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {/* cart items */}
          {cartItems.map((item) => (
            <CartItem {...item} key={item._id} />
          ))}
        </div>
      </main>
      <aside className="w-full md:w-1/3 lg:w-1/4 p-4 bg-gray-100">
        {/* product info */}
        <div className=" rounded-lg shadow p-6 bg-white h-full">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {/* promo code */}
          <div className="flex flex-col">
            <div className="flex w-full">
              <Input
                className="w-full rounded-none"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  validateCouponCode();
                }}
              />
              <Button className="rounded-none" onClick={validateCouponCode}>
                Apply
              </Button>
            </div>
            {couponCode && isValidCoupon && (
              <p className="text-green-400">
                ₹{"dicount"} off using coupon {couponCode}
              </p>
            )}
            {/* {couponCode && !isValidCoupon && (
              <p className="text-red-400">Invalid coupon code</p>
            )} */}
            {!couponCode && (
              <p className="text-sm text-gray-400 w-fu">Have a coupan code?</p>
            )}
          </div>

          {/* billing info */}
          <div className="flex flex-col gap-2">
            <p className="flex-b text-lg font-semibold">
              Subtotal <span>₹ 9999</span>
            </p>
            <p className="flex-b text-lg font-semibold">
              Shipping Charges <span>₹ 200</span>
            </p>
            <p className="flex-b text-lg font-semibold">
              Discount <span>₹ 0</span>
            </p>
            <p className="flex-b text-lg font-semibold">
              Total <span>₹ 10024</span>
            </p>
          </div>

          {/* btn */}
          <Link to={"/shipping"}>
            <Button className="w-full my-2">CheckOut</Button>
          </Link>
        </div>
        <div></div>
      </aside>
    </div>
  );
};

export default Cart;
