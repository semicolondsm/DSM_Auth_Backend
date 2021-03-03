import Joi from "joi"
import { BusinessLogic } from "../middleware/businessLogicInterface";

type ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => BusinessLogic;

const validationRequest: ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  error ? res.status(400).json({ message: "Bad Request" }) : next();
}

export { validationRequest }