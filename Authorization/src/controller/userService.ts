import { Op } from "sequelize";
import { BusinessLogic } from "../middleware/businessLogicInterface";
import { HttpError } from "../middleware/errorHandler/customError";
import { db } from "../models/index";
import { sendMail } from "./functions/sendMail";
import redisClient, { asyncRedistGet } from "../redisClient";
import bcrypt from "bcrypt";

const checkOverlapId: BusinessLogic = async (req, res) => {
  const { id } = req.body;
  if(!id) {
    throw new HttpError(400, "Bad Request");
  }
  if( 
    await db.User.findOne({ where: { identity: id }})
  ) {
    throw new HttpError(405, "Not Allowed ID");
  }
  res.status(200).json({
    message: "Allowed ID",
  });
}

const emailAuthentication: BusinessLogic = async (req, res) => {
  const { email } = req.body;
  if(!email) {
    throw new HttpError(400, "Bad Request");
  }
  const existUser = await db.User.findOne({ where: { email }});
  if(!existUser) {
    throw new HttpError(404, "Not Found Email");
  }
  const authNum: string = Math.floor(Math.random() * 1000000).toString();
  redisClient.set(email, authNum, "EX", 60 * 5, (err: Error | null) => {
    if(err) console.error(err);
    else console.log("save for redis: ", email);
  });
  sendMail(email, authNum) 
  .then(console.log)
  .catch(console.error);
  res.status(200).json({
    message: "success",
  });
}

const userSignup: BusinessLogic = async (req, res) => {
  const { id, password, name, email, authcode } = req.body;
  const data = await asyncRedistGet(email);
  if(!data) {
    throw new HttpError(400, "Bad Request");
  }
  if(data !== authcode) {
    throw new HttpError(401, "Unauthorized code");
  }
  const exUser = await db.User.findOne({ where: { [Op.and]: [{ name }, { email }] }}); 
  if(exUser && exUser.email === email) {
    const hash = await bcrypt.hash(password, 12);
    await db.User.update({
      identity: id,
      password: hash,
    }, { where: { email: email } });
    res.status(201).json({
      message: "signup successfully",
    });
  } else {
    throw new HttpError(404, "Not Found Email");
  }
}

const userServices: BusinessLogic = async (req, res, next) => {
  const userServices: any = await db.User.findOne({
    where: { identity: req.decoded.user_identity },
    include: {
      model: db.Consumer,
    }
  });
  res.json(userServices.consumers);
}

export {
  checkOverlapId,
  emailAuthentication,
  userSignup,
  userServices
}