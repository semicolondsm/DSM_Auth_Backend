import { sequelize } from "../config/connection";
import { DbInterface } from "./defaultInterfaceAttributes/db.interface";
import { UserFactory } from "./userModel/userFactory";
import { ConsumerFactory } from "./consumerModel/consumerFactory";

export const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
    Consumer: ConsumerFactory(sequelize),
  }
  return db;
}

