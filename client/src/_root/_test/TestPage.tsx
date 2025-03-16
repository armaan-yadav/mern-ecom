import CounterApp from "@/components/shared/CounterApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authServices from "@/services/userAuthServices";
import { User } from "@/types";
import { useState } from "react";

const TestPage = () => {
  const user: User = {
    _id: "abcdefglslk",
    dob: "1995-06-15",
    email: "armaan111232@gmail.com",
    gender: "male",
    name: "Armaan Yadav",
    phone: "+2122356450",
    role: "user",
  };
  const [name, setName] = useState("");
  return (
    <div>
      <CounterApp />

      <Button
        onClick={async () => {
          const user = await authServices.getCurrentUser();
          if (user) {
            console.log(user);
          }
        }}
      >
        get
      </Button>
      <Input onChange={(e) => setName(e.target.value)} value={name} />

      <Button
        onClick={async () => {
          await authServices.updateUserProfile({ displayName: name });
        }}
      >
        update
      </Button>

      <Button
        onClick={async () => {
          await authServices.logout();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default TestPage;
