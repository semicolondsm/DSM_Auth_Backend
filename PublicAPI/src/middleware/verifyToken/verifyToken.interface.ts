import { Request } from "express";

interface VerifyTokenRequest extends Request {
  [key: string]: any;
}

export { VerifyTokenRequest };

