import express from "express";
import firebase from "firebase-admin";

export const webhookRouter = express.Router();

webhookRouter.post("/payment-webhook", async (req, res) => {
  const {data} = req.body;

  try {
    const snapshot = await firebase
      .firestore()
      .collection("user_registed_events")
      .where("order_id", "==", data.order.order_id)
      .get();

    if (snapshot.size === 1) {
      const doc = snapshot.docs[0];
      await doc.ref.update({
        payment: data.payment,
        payment_gateway_details: data.payment_gateway_details,
        payment_status: data.payment.payment_status,
        payment_amount: data.payment.payment_amount,
      });

      res.status(200).send("Payment data updated successfully");
    } else {
      res.status(404).send("Order not found or multiple matching orders found");
    }
  } catch (error) {
    console.error("Error updating payment data:", error);
    res.status(500).send("Internal Server Error");
  }
});
