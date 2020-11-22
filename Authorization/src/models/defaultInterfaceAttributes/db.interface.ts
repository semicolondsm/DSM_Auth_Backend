import Sequelize from "sequelize";
import { UserInterface, ConsumerInterface } from "./model.interfaces"

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  User: Sequelize.ModelCtor<UserInterface>;
  Consumer: Sequelize.ModelCtor<ConsumerInterface>;
}