import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { brandName } from "@/constants/constants";
import { useAppSelector } from "@/hooks/hooks";
import { Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <nav className="w-full h-[56px]  flex-b">
      <h2 className="text-lg  font-semibold">{brandName}</h2>

      <div className="flex gap-2">
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>
          <Search />
        </Link>
        <Link to={"/cart"}>
          <ShoppingBag />
        </Link>

        {user ? (
          <Avatar className="cursor-pointer border-[1px] flex-c">
            <AvatarImage src={user.photo} alt="@shadcn" />
            <AvatarFallback className="font-semibold bg-black text-white flex-c">
              {user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Button>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
