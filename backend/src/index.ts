import cors from "cors";
import express, {Express} from "express";
import admin from "firebase-admin";
import {createOrderRouter} from "./routes/createOrder";

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running",
  });
});

app.use(createOrderRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
