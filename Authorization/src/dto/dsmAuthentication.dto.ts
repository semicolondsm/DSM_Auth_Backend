import Joi from "joi";

export class DsmAuthenticationDto {
  id: string;
  password: string;
  redirect_url: string;
  client_id: string;
}

export const DsmAuthenticationSchema: Joi.ObjectSchema<DsmAuthenticationDto> = Joi.object().keys({
  id: Joi.string().required(),
  password: Joi.string().required(),
  redirect_url: Joi.string().required(),
  client_id: Joi.string().required(),
});