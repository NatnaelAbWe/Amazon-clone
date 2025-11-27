import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { productUrl } from "../Api/endPoint";
import ProductCard from "../Component/ProductCard";
import Loader from "../Component/Loader";
import LayOut from "../Component/LayOut";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";
  //   the search term from query params
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    setIsLoading(true);

    const fetchProducts = async () => {
      try {
        let url = `${productUrl}/products`;

        if (category && category !== "all") {
          url += `/category/${encodeURIComponent(category)}`;
        }

        const response = await axios.get(url);
        let products = response.data;

        if (searchTerm) {
          products = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setResults(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchTerm]);

  return (
    <LayOut>
      <section className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">Results</h1>

        <p className="text-lg mb-4">
          {category !== "all" && `Category: ${category}`}{" "}
          {searchTerm && ` | Search: ${searchTerm}`}
        </p>

        <hr className="mb-6 border-gray-300" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.length > 0 ? (
              results.map((data) => (
                <ProductCard
                  key={data.id}
                  product={data}
                  renderAdd={true}
                  add_button={true}
                  titleUp={true}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                No products found.
              </p>
            )}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
