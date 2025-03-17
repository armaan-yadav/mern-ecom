import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/hooks";
import { getCurrentDateForNavbar } from "@/lib/utils";

import { Calendar } from "lucide-react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { user } = useAppSelector((state) => state.user);

  // if (!user || user.role !== "admin") return <Navigate to={"/"} />;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <main className="w-full ">
          <AdminNavbar />
          {<Outlet />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
