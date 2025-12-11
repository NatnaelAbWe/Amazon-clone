import { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";
import { Type } from "../Utility/action.type";

function ProductCard({
  product,
  flex = false,
  add_description = false,
  renderAdd = true,
  sliceDesc = false,
  titleUp = false,
}) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  const removeFromCart = () => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`
        w-full max-w-[250px] md:max-w-full
        bg-white
        p-3
        text-black
        shadow-md
        flex flex-col items-center transition
        ${
          flex
            ? "md:flex-row gap-4 w-full h-auto shadow-none"
            : "flex-col gap-3"
        }
      `}
    >
      <Link to={`/products/${id}`} className="flex-shrink-0">
        <img
          src={image}
          alt={title}
          className={`
            object-contain rounded-lg transition-transform duration-300 hover:scale-105
            ${flex ? "w-32 md:w-48 lg:w-56 h-auto" : "w-full h-48"}
          `}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col justify-between mt-3 md:mt-0 md:ml-4 flex-1">
        {titleUp && <h3 className="text-lg font-semibold">{title}</h3>}
        {sliceDesc && (
          <h3 className="text-lg font-semibold">{`${title.slice(
            0,
            30
          )}...`}</h3>
        )}

        {add_description && (
          <p className="text-gray-600 text-sm mt-2">{description}</p>
        )}
        {sliceDesc && (
          <p className="text-gray-600 text-sm mt-2">{`${description.slice(
            0,
            90
          )}...`}</p>
        )}

        <div className="flex items-center mt-2">
          <Rating value={rating?.rate} precision={0.1} />
          <small className="ml-2">{rating?.count}</small>
        </div>

        <div className="mt-2 font-semibold text-green-700">
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button
            onClick={addToCart}
            className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-full transition"
          >
            Add to cart
          </button>
        )}
        {!renderAdd && (
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-full transition"
            onClick={removeFromCart}
          >
            Remove From Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
