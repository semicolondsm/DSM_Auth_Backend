import Sequelize from "sequelize";
import { UserAttributes } from "../models/attributes"
import { UserInterface } from "../models/interfaces"

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  User: Sequelize.ModelCtor<UserInterface>;
}