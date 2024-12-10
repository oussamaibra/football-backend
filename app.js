const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const courtRoutes = require("./routes/courts");
Stripe = require("stripe");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);
app.use("/courts", courtRoutes);

const Key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(Key, {
  apiVersion: "2024-06-20",
});

app.post("/api/v1/create-payment-intent", async (req, res) => {
  try {

    const totalPrice = req.body.totalPrice;
    const email = req.body.email;
    const name = req.body.name;

    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      currency: "EUR",
      amount: Number(totalPrice) * 100,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
