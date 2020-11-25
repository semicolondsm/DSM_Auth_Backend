import { BusinessLogic } from "../middleware/businessLogicInterface";
import { HttpError } from "../middleware/errorHandler/customError";
import { db } from "../models/index";

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

export const userSignUpController = {
  checkOverlapId,
}