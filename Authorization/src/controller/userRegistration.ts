import { BusinessLogic } from "../middleware/businessLogicInterface";
import { HttpError } from "../middleware/errorHandler/customError";
import { db } from "../models/index";
import { sendMail } from "./sendMail";

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
  req.session[email] = authNum;
  sendMail(email, authNum)
  .then(console.log)
  .catch(console.error);
  res.status(200).json({
    message: "success",
  });
}

export const userSignUpController = {
  checkOverlapId,
  emailAuthentication,
}