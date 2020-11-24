import { Sequelize, Options } from "sequelize";
import databaseConfigList from "./database.config";

const env = process.env.NODE_ENV || "development";
const config: Options = databaseConfigList[env];

export const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  {
    host: config.host!,
    dialect: "mysql",
    define: {
      timestamps: false,
    } 
  }
);