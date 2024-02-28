import {NextFunction, Request, Response} from "express";
import admin from "firebase-admin";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.body.uid = decodedToken.uid;
        next();
      })
      .catch((error) => {
        res.send({
          status: "error",
          message: "unauthorized",
        });
      });
  }
};
