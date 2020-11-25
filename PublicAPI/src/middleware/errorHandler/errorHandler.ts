import { Response } from "express";
import { VerifyTokenRequest } from "../verifyToken/verifyToken.interface";

type RoutingLogic = (req: VerifyTokenRequest, res: Response) => void;

const errorHandler = (myFunc: RoutingLogic): RoutingLogic => {
  return async (req: VerifyTokenRequest, res: Response) => {
    try {
      await myFunc(req, res);
    } catch(err) {
      console.log(err);
      res.status(err.status || 500).json({
        code: err.status || 500,
        message: err.message || "Interval Server Error",
      });
    }
  }
}

export {
  errorHandler
}