import { getCurrentDateForNavbar } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

const AdminNavbar = () => {
  return (
    <nav className="h-[66px] w-full ring-1 flex items-center px-2">
      <SidebarTrigger className="cursor-pointer" />
      <div className="ml-auto flex-c  gap-2 ring-1 text-sm font-semibold rounded-sm p-1">
        <Calendar size={17} />
        {getCurrentDateForNavbar()}
      </div>
    </nav>
  );
};

export default AdminNavbar;
