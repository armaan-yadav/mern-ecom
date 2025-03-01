import ProductCard from "@/components/shared/ProductCard";
import { dummyProduct } from "@/constants/constants";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="h-[300px] flex-c bg-[#f1f1f1]">Banner Image</section>

      {/* latest products section */}
      <div className="px-4 py-2">
        <div className="flex-b">
          <h3 className="text-3xl font-semibold">Latest Products</h3>
          <Link to={"/search"} className="text-2xl font-semibold">
            <h4 className="font-light">More</h4>
          </Link>
        </div>

        {/* products */}
        <div>
          <ProductCard {...dummyProduct} handler={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Home;
