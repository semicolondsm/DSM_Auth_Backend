import { BusinessLogic } from "../middleware/businessLogicInterface";
import { HttpError } from "../middleware/errorHandler/customError";
import { db } from "../models/index";
import { sendMail } from "./sendMail";
import redisClient from "../redisClient";

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
  redisClient.get(email, async (err: Error | null, data: string | null) => {
    if(err) {
      throw new HttpError(400, "Bad Request");
    }
    if(data !== authcode) {
      throw new HttpError(401, "Unauthorized code");
    }
    const exUser = await db.User.findOne({ where: { name }}); 
    if(exUser && exUser.email === email) {
      db.User.update({
        identity: id,
        password: password,
      }, { where: { email: email } })
      .then(() => console.log("User SingUp ", exUser.name));
      res.status(200).json({
        message: "signup successfully",
      });
    } else {
      throw new HttpError(404, "Not Found Email");
    }
  });
}

export {
  checkOverlapId,
  emailAuthentication,
  userSignup
}