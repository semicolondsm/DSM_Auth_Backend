import { BusinessLogic } from "../middleware/businessLogicInterface";
import { db } from "../models/index";
import { UserInterface, ConsumerInterface } from "../models/defaultInterfaceAttributes/model.interfaces";
import { HttpError } from "../middleware/errorHandler/customError";
import bcrypt from "bcrypt";
import redisClient, { asyncRedistGet } from "../redisClient";
import { v4 } from "uuid";
import * as issuanceToken from "./functions/issuanceToken";

const dsmLogin: BusinessLogic = async (req, res, next) => {
  const { id, password, redirect_url, client_id } = req.body;
  const promise_exUser: Promise<UserInterface | null> = db.User.findOne({ where: { identity: id } });
  const promise_exConsumer: Promise<ConsumerInterface | null> = db.Consumer.findOne({ where: { client_id } });

  // user authentication 
  const exUser: UserInterface | null = await promise_exUser; // nullable 
  if(!exUser) {
    throw new HttpError(401, "Unauthorized id");
  } 
  const pwdCmp: boolean = await bcrypt.compare(password, exUser.password as string);
  if(!pwdCmp) {
    throw new HttpError(401, "Unauthorized password");
  }
  
  // consumer authenticaion
  const exConsumer: ConsumerInterface | null = await promise_exConsumer; // nullable
  if(!exConsumer || exConsumer.redirect_url !== redirect_url) {
    throw new HttpError(400, "Bad Request");
  } 
  const code: string = v4();
  redisClient.set(code, exUser.identity!, "EX", 90);

  res.status(200).json({
    location: `${redirect_url}?code=${code}`,
  });
}

const provideToken: BusinessLogic = async (req, res, next) => {
  const { client_id, client_secret, code } = req.body;
  const consumer: ConsumerInterface | null = await db.Consumer.findOne({
    where: { client_id: client_id },
  });
  // client_id authentication
  if(!consumer) {
    throw new HttpError(400, "Bad Request");
  } 
  // client_secret authtication 
  if(consumer.client_secret !== client_secret) {
    throw new HttpError(401, "Unauthorized Secret Key");
  }
  // query string code authentication
  const user_identity: string = await asyncRedistGet(code) as string;
  if(!user_identity) {
    throw new HttpError(403, "Forbidden code");
  }
  const accessToken: string = await issuanceToken.access(user_identity, client_id);
  const refreshToken: string = await issuanceToken.refresh(user_identity, client_id);
  res.status(200).json({
    "access-token": accessToken,
    "refresh-token": refreshToken,
  });
  redisClient.del(code, (err) => {
    if(err) console.log(err);
  });
}

const refreshToken: BusinessLogic = async (req, res, next) => {
  const { user_identity, client_id } = req.rt_decoded;
  const exConsumer: ConsumerInterface | null = await db.Consumer.findOne({ where: { client_id } });
  if(!exConsumer) {
    throw new HttpError(403, "Forbidden Consumer");
  }
  const accessToken: string = await issuanceToken.access(user_identity, client_id);
  res.status(200).json({
    "access-token": accessToken,
  });
}

export {
  dsmLogin,
  provideToken,
  refreshToken
}