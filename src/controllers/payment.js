import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment.js";

const razorpay = new Razorpay({
  
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order creation failed", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, userId } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const isValid = expectedSignature === signature;

    const payment = await Payment.create({
      userId,
      orderId,
      paymentId,
      signature,
      verified: isValid,
    });

    res.status(200).json({
      message: isValid ? "Payment verified successfully" : "Invalid signature",
      payment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Verification failed", error: error.message });
  }
};
