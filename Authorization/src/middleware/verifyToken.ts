import jwt from "jsonwebtoken";
import { HttpError } from "./errorHandler/customError";
import { errorHandler } from "./errorHandler/errorHandler";

import { BusinessLogic } from "./businessLogicInterface";

const verifyTokenLogic: BusinessLogic = (req, res, next) => {
  try {
    const token: any = req.headers["access-token"];
    if(!token) {
      throw new HttpError(400, "Bad Request", 400);
    }
    req.decoded = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch(err) {
    console.error(err);
    if(err.name === "TokenExpiredError") {
      throw new HttpError(401, "Expired token", 419);
    }
    throw new HttpError(401, "Unauthorized token", 401);
  }
}

const verifyToken: BusinessLogic = errorHandler(verifyTokenLogic);

export { verifyToken }