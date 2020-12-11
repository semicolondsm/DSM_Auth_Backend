import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import { ConsumerAttributes } from "./attributes";
import { ConsumerInterface } from "../defaultInterfaceAttributes/model.interfaces";

export const ConsumerFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<ConsumerInterface> => {
  const attributes: SequelizeAttributes<ConsumerAttributes> = {
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    }, 
    domain_url: {
      type: Sequelize.STRING(100),
      allowNull: true,
    }, 
    redirect_url: {
      type: Sequelize.STRING(200),
      allowNull: false,
    }, 
    client_id: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    client_secret: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  };

  const Consumer = sequelize.define<ConsumerInterface, ConsumerAttributes>("consumers", attributes);
  return Consumer;
}

