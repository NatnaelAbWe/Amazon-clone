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
  const total = req.query.total;
  total > 0
    ? console.log("payment successful", total)
    : console.log("invalid payment");
});

exports.api = onRequest(app);
