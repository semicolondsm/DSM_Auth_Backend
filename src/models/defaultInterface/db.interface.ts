import Sequelize from "sequelize";
import { UserInterface } from "./model.interfaces"

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  User: Sequelize.ModelCtor<UserInterface>;
}