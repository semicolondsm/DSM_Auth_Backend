import Sequelize from "sequelize";
import { UserAttributes } from "../userModel/attributes";
import { ConsumerAttributes } from "../consumerModel/attributes";

interface UserInterface extends Sequelize.Model<UserAttributes, UserAttributes>, UserAttributes {}
interface ConsumerInterface extends Sequelize.Model<ConsumerAttributes, ConsumerAttributes>, ConsumerAttributes {} 

export {
  UserInterface,
  ConsumerInterface,
}