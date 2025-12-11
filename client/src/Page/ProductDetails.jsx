import { useParams } from "react-router-dom";
import LayOut from "../Component/LayOut";
import axios from "axios";
import { useEffect, useState } from "react";
import { productUrl } from "../Api/endPoint";
import Loader from "../Component/Loader";
import { useContext } from "react";
import { DataContext } from "../Component/DataProvider";
import { Type } from "../Utility/action.type";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  if (!product) {
    return (
      <LayOut>
        <div className="text-center py-20 text-lg font-semibold">
          <Loader />
        </div>
      </LayOut>
    );
  }

  const { id, title, price, description, category, image, rating } = product;

  return (
    <LayOut>
      <section className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}

        <div className="flex justify-center items-center">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-72 md:w-96 object-contain rounded-t-2xlxl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold mb-3">{title}</h2>

          <p className="text-gray-500 text-sm mb-2 capitalize">
            Category:{" "}
            <span className="font-medium text-gray-800">{category}</span>
          </p>

          <p className="text-yellow-500 font-semibold mb-3 shadow-md">
            ⭐ Rating: {rating?.rate} / 5 ({rating?.count} reviews)
          </p>

          <p className="text-xl font-semibold text-green-600 mb-4">${price}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </LayOut>
  );
};

export default ProductDetail;
