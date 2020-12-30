import jwt from "jsonwebtoken";
import { HttpError } from "./errorHandler/customError";
import { errorHandler } from "./errorHandler/errorHandler";

import { BusinessLogic } from "./businessLogicInterface";

const verifyRefreshTokenLogic: BusinessLogic = (req, res, next) => {
  try {
    const refreshToken: string | undefined = req.headers["refresh-token"] as string; // undifinedable
    if(!refreshToken) {
      throw new HttpError(400, "Bad Request", 400);
    }
    const decoded: object & { type: string } = jwt.verify(refreshToken.slice(7), process.env.JWT_SECRET!) as object & { type: string };
    if(decoded.type !== "refresh") {
      throw new Error();
    }
    req.rt_decoded = jwt.verify(refreshToken.slice(7), process.env.JWT_SECRET!);
    next();
  } catch(err) {
    console.error(err);
    if(err.name === "TokenExpiredError") {
      throw new HttpError(401, "Expired token", 419);
    }
    throw new HttpError(401, "Unauthorized token", 401);
  }
}

const verifyRefreshToken: BusinessLogic = errorHandler(verifyRefreshTokenLogic);

export { verifyRefreshToken }