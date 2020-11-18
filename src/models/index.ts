import { sequelize } from "../config/connection";
import { DbInterface } from "./defaultInterface/db.interface";
import { UserFactory } from "./userModel/userFactory";

export const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
  }
  return db;
}

