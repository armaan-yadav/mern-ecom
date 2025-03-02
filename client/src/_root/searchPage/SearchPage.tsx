import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyProduct } from "@/constants/constants";
import { SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Search = () => {
  const [sortBy, setSortBy] = useState("none");
  const [category, setCategory] = useState("all");

  return (
    <div className="min-h-screen  md:flex">
      <aside className="md:w-1/4 bg">
        <div className="">
          <h2>Sort</h2>
          <Select defaultValue={sortBy} onValueChange={(e) => setSortBy(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="highToLow">High to Low</SelectItem>
                <SelectItem value="lowToHigh">Low to High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="bg">
          <h2>Category</h2>
          <Select defaultValue={category} onValueChange={(e) => setCategory(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select category</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </aside>
      <main className="md:w-3/4 px-2 md:px-4">
        <h1 className="text-3xl font-semibold">Search Products</h1>
        <div className="flex my-4">
          <Input
            className="rounded-none "
            placeholder="Search for products..."
          />
          <Button className="rounded-none">
            <SearchIcon />
          </Button>
        </div>

        {/* dummy products for now  */}

        <div className="grid  md:grid-cols-3">
          {" "}
          <ProductCard {...dummyProduct} />
          <ProductCard {...dummyProduct} />
          <ProductCard {...dummyProduct} />
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default Search;
