import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

interface FormData {
  name: string;
  phoneNumber: string;
  address: string;
  pinCode: string;
  state: string;
  city: string;
}
const ShippingPage = () => {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    city: "",
    name: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    //handle validation via regex
    e.preventDefault();

    console.log(formData);
  };
  return (
    <div className="min-h-screen flex-c">
      <Card className="w-[440px]">
        <CardHeader>
          <h1 className="text-2xl font-bold">Shipping Address</h1>
          <CardDescription className="text-sm text-gray-600">
            Enter your shipping details
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-2">
            <Label htmlFor="name" className="flex-col items-start text-lg">
              Name
              <Input
                onChange={handleChange}
                value={formData.name}
                className="font-light"
                name="name"
                placeholder="Enter your name"
              />
            </Label>
            <Label htmlFor="phone" className="flex-col items-start text-lg">
              Phone Number
              <Input
                onChange={handleChange}
                value={formData.phoneNumber}
                className="font-light"
                name="phoneNumber"
                placeholder="Enter your phone number"
              />
            </Label>
            <Label htmlFor="address" className="flex-col items-start text-lg">
              Address
              <Input
                onChange={handleChange}
                value={formData.address}
                className="font-light"
                name="address"
                placeholder="Enter your address"
              />
            </Label>
            <div className="flex gap-3">
              <Label
                htmlFor="state"
                className="flex-col items-start text-lg w-full"
              >
                State
                <Input
                  onChange={handleChange}
                  value={formData.state}
                  className="font-light"
                  name="state"
                  placeholder="Enter your state name"
                />
              </Label>
              <Label
                htmlFor="city"
                className="flex-col items-start text-lg w-full"
              >
                City
                <Input
                  onChange={handleChange}
                  value={formData.city}
                  className="font-light"
                  name="city"
                  placeholder="Enter your city name"
                />
              </Label>
            </div>
            <Label htmlFor="pin" className="flex-col items-start text-lg">
              Pincode
              <Input
                onChange={handleChange}
                value={formData.pinCode}
                className="font-light"
                name="pinCode"
                placeholder="Enter your area pincode"
              />
            </Label>
          </CardContent>
          <CardFooter className="mt-4">
            <Button className="w-full">Pay Now</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ShippingPage;
