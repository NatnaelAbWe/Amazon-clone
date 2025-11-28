import React, { useContext } from "react";
import LayOut from "../Component/LayOut";
import { DataContext } from "../Component/DataProvider";
import ProductCard from "../Component/ProductCard";
import CurrencyFormat from "../Component/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className="flex flex-col md:flex-row gap-8 w-full px-6 py-10">
        <div className="flex-1 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Hello</h2>
          <h3 className="text-lg font-medium mt-1">Your Shopping Basket</h3>
          <hr className="my-4" />

          {basket?.length === 0 ? (
            <p className="text-gray-500">Oops! No items in your cart.</p>
          ) : (
            basket?.map((item, i) => (
              <section
                key={i}
                className="flex items-start justify-between border-b pb-4 mb-4"
              >
                <ProductCard
                  key={item.id}
                  renderAdd={false}
                  product={item}
                  add_description={true}
                  flex={true}
                  titleUp={true}
                />

                <div className="flex flex-col items-center gap-2">
                  <button
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>

                  <span className="font-semibold">{item.amount}</span>

                  <button
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className="w-full md:w-1/3 bg-white p-6 rounded shadow h-fit">
            <div className="flex justify-between items-center">
              <p className="text-lg">Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" />
              <small className="text-gray-600">
                This order contains a gift
              </small>
            </div>

            <Link
              to="/payments"
              className="block text-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded mt-5"
            >
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
