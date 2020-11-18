import { sequelize } from "../config/connection";
import { DbInterface } from "../db/db.interface";
import { UserFactory } from "./userFactory";

export const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
  }
  return db;
}

