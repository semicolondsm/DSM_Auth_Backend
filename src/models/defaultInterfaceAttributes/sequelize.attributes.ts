import Sequelize from "sequelize";

type SequelizeAttribute = string | 
  Sequelize.DataTypeAbstract | 
  Sequelize.ModelAttributeColumnOptions;

export type SequelizeAttributes<T extends { [key: string]: any}> = {
  [p in keyof T]: SequelizeAttribute;
};

