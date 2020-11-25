import { Response } from "express";
import { db } from "../models/index";
import { VerifyTokenRequest } from "../middleware/verifyToken/verifyToken.interface";
import { HttpError } from "../middleware/errorHandler/customError";

type RoutingLogic = (req: VerifyTokenRequest, res: Response) => void;

const provideBasicInfo: RoutingLogic = async (req, res) => {
  const userIdentity = req.decoded["user_identity"];
  const user = await db.User.findOne({
    where: { identity: userIdentity }
  });
  if(!user) {
    throw new HttpError(400, "Bad Request");
  }
  res.status(200).json({
    name: user.name,
    gcn: user.gcn,
    email: user.email,
  });
}

export const provideInfo = {
  provideBasicInfo,
}