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
    if (processing) return;
    setProcessing(true);
    setCardError("");

    try {
      if (!stripe || !elements) throw new Error("Stripe.js has not loaded yet");

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      // 1. Create a Payment Method using the Card Element
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement, // Pass the CardElement here
        });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // *** You will now use paymentMethod.id instead of the CardElement itself ***

      const amount = Math.round(total * 100);

      // 2. Get the client secret from your backend
      const response = await axiosInstance.post(
        `/payment/create?total=${amount}`
      );
      const clientSecret = response.data.clientSecret;
      console.log("Using clientSecret:", clientSecret);

      // 3. Confirm the Card Payment using the client secret and the created payment method ID
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id, // <--- Pass the ID here
      });

      if (result.error) throw new Error(result.error.message);

      // ... (rest of your success logic: saving order, emptying basket, navigating)
      const paymentIntent = result.paymentIntent;
      console.log("Payment succeeded:", paymentIntent.id);

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_BASKET });
      navigate("/orders", { state: { msg: "Order placed successfully" } });
    } catch (err) {
      setCardError(err.message);
      console.error(err);
    } finally {
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
