import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useState, useEffect } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error: " + err);
        setIsLoading(false);
      });
  }, [setProducts]);

  console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section
          className="
            grid 
            grid-cols-[repeat(auto-fill,minmax(250px,1fr))] 
            max-w-[1450px] 
            mx-auto 
            my-[100px] 
            gap-[50px] 
            justify-items-center
          "
        >
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              key={singleProduct.id}
              product={singleProduct}
              sliceDesc={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
