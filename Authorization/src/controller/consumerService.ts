import { BusinessLogic } from "../middleware/businessLogicInterface";
import { v4 } from "uuid";
import { db } from "../models/index";
import { UserInterface, ConsumerInterface } from "../models/defaultInterfaceAttributes/model.interfaces";
import { HttpError } from "../middleware/errorHandler/customError";

const consumerRegstration: BusinessLogic = async (req, res, next) => {
  const { consumer, domain_url, redirect_url } = req.body;
  const user: UserInterface | null = await db.User.findOne({
    where: { identity: req.decoded.user_identity },
    attributes: ["id"],
  });
  if(!user) {
    throw new HttpError(400, "Bad Request");
  }
  const client_id_uuid: string = v4();
  const client_secret_uuid: string = v4();
  await db.Consumer.create({
    name: consumer,
    domain_url,
    redirect_url,
    client_id: client_id_uuid.replace(/-/, ""),
    client_secret: client_secret_uuid.replace(/-/, ""),
    UserId: user.id!,
  });
  res.status(200).json({
    client_id: client_id_uuid, 
    client_secret: client_secret_uuid,
  });
}

export {
  consumerRegstration,
}