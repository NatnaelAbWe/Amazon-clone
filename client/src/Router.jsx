import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import SignIn from "./Page/Auth";
import Payment from "./Page/Payment";
import Orders from "./Page/Orders";
import Cart from "./Page/Cart";
import Results from "./Page/Results";
import ProductDetail from "./Page/ProductDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Component/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51Q21RTKXqjMvF8GpDxoYiJrJakY0EfRCfYMvM8Cv5Fm3M1Uj7iPBTAYSDO8gFJZfNptmVcTLePW0Zo569vJv2vwC004KAlge8i"
);

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Public route for the landing page */}
        <Route path="/" element={<Home />} />

        {/* Public route for authentication (Sign In) */}
        <Route path="/auth" element={<SignIn />} />

        {/* Protected route for payments, users must be logged in */}
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"} // Message to show if the user is not logged in
              redirect={"/payments"} // Redirect back to the payments page after login
            >
              {/* Wrapping Payment component with Stripe Elements */}
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        {/* Protected route for viewing orders, users must be logged in */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to see your orders"} // Message if user is not logged in
              redirect={"/orders"} // Redirect back to the orders page after login
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Route for showing product results based on category */}
        <Route path="/category/:categoryName" element={<Results />} />

        {/* Route for search results */}
        <Route path="/results" element={<Results />} />

        {/* Route for product details page */}
        <Route path="/products/:productId" element={<ProductDetail />} />

        {/* Route for the cart page */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
