import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./Component/DataProvider.jsx";
import { reducer, initialState } from "./Utility/Reducer.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Sd1lPJUD5J964ujFWx2VTXxxZq7kqY3CnvCOJmjeykgo8JosC6tJ4NDgY94kETUgKLw1hGqcrzNvBlzcJndxygj00UoLWhknt"
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DataProvider reducer={reducer} initialState={initialState}>
    <Elements stripe={stripePromise}>
      {" "}
      <App />
    </Elements>
  </DataProvider>
  // </StrictMode>
);
