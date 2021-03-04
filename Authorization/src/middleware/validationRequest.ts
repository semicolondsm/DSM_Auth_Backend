import Joi from "joi"
import { BusinessLogic } from "./businessLogicInterface";

type ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => BusinessLogic;

const validationRequest: ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  error ? res.status(400).json({ code: 400, message: "Bad Request" }) : next();
}

export { validationRequest }