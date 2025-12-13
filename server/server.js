const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: true }));

// test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "successful!" });
});

app.post("/payment/create", async (req, res) => {
  let total = Number(req.query.total);
  // console.log(req);

  total = Math.round(total);

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      console.log("Payment Intent Created:", paymentIntent.id);

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Stripe Error:", error.message);
      res.status(500).json({
        message: "Stripe Payment Intent creation failed.",
        error: error.message,
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "Total amount must be greater than zero." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
