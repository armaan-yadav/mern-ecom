import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboardCardShimmer = () => {
  return (
    <div className="ring-1 ring-black/40 w-[250px] h-[120px] rounded-[1px] p-3 bg-white flex">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Skeleton className="h-6 w-24 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="h-9 w-16" />
      </div>
      <div className="px-4 flex flex-col justify-between">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
};

export default AdminDashboardCardShimmer;
