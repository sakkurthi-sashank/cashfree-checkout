import {Cashfree} from "cashfree-pg";
import express from "express";
import {verifyToken} from "../middleware";

export const createOrderRouter = express.Router();

Cashfree.XClientId = "TEST10138678cac1a1704900a4e6e30587683101";
Cashfree.XClientSecret =
  "cfsk_ma_test_73b4d445aa01c38d6d6e118a43e6ebd4_bde3b13e";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

createOrderRouter.post(
  "/api/v1/cashfree/order",
  verifyToken,
  async (req, res) => {
    const {customer_id, customer_name, customer_email, customer_phone} =
      req.body;

    console.log(customer_id, customer_name, customer_email, customer_phone);

    if (!customer_id || !customer_name || !customer_email || !customer_phone) {
      return res.status(400).send({
        message: "Invalid request",
      });
    }

    try {
      const orderRequest = {
        order_amount: 1000,
        order_currency: "INR",
        customer_details: {
          customer_id: customer_id,
          customer_name: customer_name,
          customer_email: customer_email,
          customer_phone: customer_phone,
        },
        order_meta: {
          return_url: "https://www.cashfree.com",
        },
        order_note: "",
      };

      const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);
      const responseData = response.data;

      console.log(responseData);

      res.status(200).send({
        data: responseData,
        message: "Order created successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal server error",
      });
    }
  },
);
