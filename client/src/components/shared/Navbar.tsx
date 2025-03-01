import { brandName } from "@/constants/constants";
import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { Button } from "../ui/button";

const user = {
  _id: "123",
  type: "admin",
};

const Navbar = () => {
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
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>

        {user.type == "admin" && <Link to={"/admin"}>Admin</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
