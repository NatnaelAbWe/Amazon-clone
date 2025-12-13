import React, { useContext, useState } from "react";
import LayOut from "../Component/LayOut/";
import { DataContext } from "../Component/DataProvider";
import ProductCard from "../Component/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../Component/CurrencyFormat";
import { axiosInstance } from "../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (basket.length === 0) {
      setCardError("Your basket is empty.");
      return;
    }

    try {
      setProcessing(true);

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response);
      const clientSecret = response.data?.clientSecret;
      console.log(clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      console.log(result);
      if (result.error) {
        // Payment failed
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      // Payment succeeded
      const paymentIntent = result.paymentIntent;
      console.log(paymentIntent);

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      setCardError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className="text-xl font-medium p-4 bg-white shadow-md mb-6">
        Checkout ({totalItem}) items
      </div>

      <section className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg flex flex-col gap-6">
        <div className="flex gap-6">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <div className="text-gray-700">
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia, IL</div>
          </div>
        </div>

        <hr />

        <div className="flex gap-6">
          <h3 className="text-lg font-semibold">Review items and Delivery</h3>
          <div className="flex flex-col gap-4">
            {basket?.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                flex={true}
                titleUp={true}
                renderAdd={false}
              />
            ))}
          </div>
        </div>

        <hr />

        <div className="flex gap-6">
          <h3 className="text-lg font-semibold">Payment methods</h3>
          <div className="w-full">
            <form onSubmit={handlePayment} className="flex flex-col gap-4">
              {cardError && <small className="text-red-600">{cardError}</small>}

              <CardElement
                onChange={handleChange}
                className="p-2 border rounded"
              />

              <div className="flex flex-col gap-4 mt-4">
                <span className="text-lg font-medium">
                  Total Order | <CurrencyFormat amount={total} />
                </span>

                <button
                  type="submit"
                  disabled={processing}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded flex justify-center items-center"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <ClipLoader size={12} />
                      <p>Please wait ....</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
