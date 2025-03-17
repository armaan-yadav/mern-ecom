import ProductCard from "@/components/shared/ProductCard";
import ProductCardShimmer from "@/components/shimmer/ProductCardShimmer";
import { useGetLatestProductsQuery } from "@/redux/products/productsApi";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isSuccess } = useGetLatestProductsQuery();

  console.log(data);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Responsive Banner */}
      <section className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-4">
            Welcome to Our Store
          </h2>
          <p className="text-md sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest products with amazing deals
          </p>
          <button className="mt-4 md:mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all">
            Shop Now
          </button>
        </div>
      </section>
      {/* Latest products section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-2xl sm:text-3xl font-semibold">
            Latest Products
          </h3>
          <Link
            to={"/search"}
            className="text-lg sm:text-xl text-primary hover:underline transition-all"
          >
            <h4 className="font-medium">View All</h4>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <ProductCardShimmer key={i} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {data &&
              [...data, ...data].map((product) => (
                <div
                  key={product._id}
                  className="transition-transform hover:scale-[1.02] duration-300"
                >
                  <ProductCard product={product} handler={() => {}} />
                </div>
              ))}
          </div>
        )}
      </div>
      {/* Featured Categories Section */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6 md:mb-8">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Electronics",
              "Clothing",
              "Home",
              "Beauty",
              "Sports",
              "Books",
            ].map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full mb-3"></div>
                <h4 className="font-medium">{category}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
