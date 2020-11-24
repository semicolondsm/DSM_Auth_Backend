import jwt from "jsonwebtoken";

import { Response, NextFunction } from "express";
import { VerifyTokenRequest } from "./verifyToken.interface";

const verifyToken = (req: VerifyTokenRequest, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers["access-token"];
    if(!token) {
      return res.status(400).json({
        code: 400, 
        message: "Bad Request",
      });
    }
    req.decoded = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch(err) {
    //console.error(err);
    if(err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: 419,
        message: "Expired token",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "Unauthorized token",
    });
  }
}

export { verifyToken }