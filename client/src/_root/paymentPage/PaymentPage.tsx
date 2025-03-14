import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Order {
  id: string;
  amount: number;
  currency: string;
}

const PaumentPage: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);

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
    try {
      const res = await fetch(
        "http://localhost:4500/api/v1/payments/create-order",
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
      amount: order.amount, // Dynamic amount
      currency: order.currency,
      name: "Kapde Wale",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:4500/api/v1/payments/verify",
      notes: { address: "Earth" },
      prefill: {
        name: "Armaan Yadav",
        email: "armaan.yadav@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="flex-c">
      <Button onClick={checkoutHandler}>Click to Pay</Button>
    </div>
  );
};

export default PaumentPage;
