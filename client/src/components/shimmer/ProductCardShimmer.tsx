import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProductCardShimmer = () => {
  return (
    <Card className="w-full h-full flex flex-col relative overflow-hidden py-0 shadow-sm border-gray-200">
      <div className="h-48 xs:h-52 sm:h-56 md:h-60 overflow-hidden bg-[#f8f8f8] p-4">
        <Skeleton className="w-full h-full" />
      </div>

      <CardContent className="px-3 sm:px-4 pt-3 pb-2 flex-grow">
        <div className="flex flex-col">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />

          <div className="flex items-baseline gap-1.5">
            <Skeleton className="h-5 w-16" />
          </div>

          <Skeleton className="h-3 w-20 mt-1.5" />
        </div>
      </CardContent>

      <CardFooter className="p-0 pt-1 border-t border-gray-100 mt-auto">
        <Skeleton className="w-full h-10 sm:h-11" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardShimmer;
