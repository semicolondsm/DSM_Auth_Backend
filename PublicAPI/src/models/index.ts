import { sequelize } from "../config/connection";
import { DbInterface } from "./defaultInterfaceAttributes/db.interface";
import { UserFactory } from "./userModel/userFactory";
import { ConsumerFactory } from "./consumerModel/consumerFactory";

const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
    Consumer: ConsumerFactory(sequelize),
  }
  db.User.hasMany(db.Consumer, { foreignKey: "UserId", sourceKey: "id" });
  db.Consumer.belongsTo(db.User, { foreignKey: "UserId", targetKey: "id" });
  return db;
}

export const db = createModels();

