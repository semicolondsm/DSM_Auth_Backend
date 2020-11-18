import Sequelize from "sequelize";
import { UserAttributes } from "../userModel/attributes";

interface UserInterface extends Sequelize.Model<UserAttributes, UserAttributes>, UserAttributes {}

export {
  UserInterface
}