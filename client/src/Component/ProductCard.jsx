import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({
  product,
  flex,
  add_description,
  renderAdd,
  sliceDesc,
  titleUp,
}) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`
        w-[250px] 
        shadow-md shadow-green-900/40 
        p-3 
        text-black 
        flex flex-col 
        items-center 
        justify-center 
        transition
        ${
          flex
            ? "flex gap-3 w-[98%] h-auto shadow-none md:flex-row flex-col"
            : ""
        }
      `}
    >
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title}
          className="p-3 w-full h-[200px] object-contain"
        />
      </Link>

      <div>
        {/* Title */}
        {titleUp && <h3 className="py-3">{title}</h3>}

        {sliceDesc && <h3 className="py-3">{`${title.slice(0, 30)} ...`}</h3>}

        {/* Description */}
        {add_description && <div className="max-w-[750px]">{description}</div>}

        {sliceDesc && (
          <div className="max-w-[350px]">{`${description.slice(
            0,
            90
          )}...`}</div>
        )}

        {/* Rating */}
        <div className="flex items-center py-2">
          <Rating value={rating?.rate} precision={0.1} />
          <small className="ml-1">{rating?.count}</small>
        </div>

        {/* Price */}
        <div className="py-1">
          <CurrencyFormat amount={price} />
        </div>

        {/* Add to cart button */}
        {renderAdd && (
          <button
            onClick={addToCart}
            className="
              px-4 py-2 
              font-medium 
              cursor-pointer 
              bg-[#f7ca00] 
              rounded-full 
              mt-5 mb-2
              hover:bg-[#d3ad04]
            "
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
