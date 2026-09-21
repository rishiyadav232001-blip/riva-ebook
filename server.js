const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("RAZORPAY KEY ID PRESENT:", !!process.env.RAZORPAY_KEY_ID);
key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 100,
      currency: "INR",
      receipt: "riva_" + Date.now()
    });

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to create payment order"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Riva Ebook Payment Server is running.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
