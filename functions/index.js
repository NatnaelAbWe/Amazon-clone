const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "sucessfull!" });
});

app.post("/payment/create", async (req, res) => {
  const total = Number(req.query.total);

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    console.log(paymentIntent);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(404).json({ message: "total amount must be greater than zero" });
  }
});

exports.api = onRequest(app);
