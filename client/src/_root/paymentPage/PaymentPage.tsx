import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Order {
  id: string;
  amount: number;
  currency: string;
}

const PaymentPage: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function loadScript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  const checkoutHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "http://localhost:4000/api/v1/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: "67c88ae0ad8b920e010b7b68",
            quantity: 1,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create order");

      const { data }: { data: { order: Order } } = await res.json();
      setOrder(data.order);
      await displayRazorpay(data.order);
    } catch (error) {
      console.error("Error in checkoutHandler:", error);
      alert("Failed to initiate payment.");
    } finally {
      setIsLoading(false);
    }
  };

  async function displayRazorpay(order: Order) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Kapde Wale",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response: any) {
        // Handle successful payment
        alert(`Payment Success! Payment ID: ${response.razorpay_payment_id}`);

        // You can still verify on your server
        fetch("http://localhost:4500/api/v1/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        })
          .then((res) => {
            if (res.ok) {
              // Handle successful verification
              console.log("Payment verified successfully");
            }
          })
          .catch((err) => {
            console.error("Payment verification failed", err);
          });
      },
      prefill: {
        name: "Armaan Yadav",
        email: "armaan.yadav@example.com",
        contact: "9999999999",
      },
      notes: { address: "Earth" },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button onClick={checkoutHandler} disabled={isLoading}>
        {isLoading ? "Processing..." : "Click to Pay"}
      </Button>
    </div>
  );
};

export default PaymentPage;
