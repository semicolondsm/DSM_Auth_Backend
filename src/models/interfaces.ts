import Sequelize from "sequelize";
import { UserAttributes } from "./attributes";

export interface UserInterface extends Sequelize.Model<UserAttributes, UserAttributes>, UserAttributes {

}