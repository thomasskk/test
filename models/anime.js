import { DataTypes, Sequelize } from "sequelize";
import { MysqlConnection } from "../repository/MysqlConnection";

export const Anime = MysqlConnection.define(
  "anime",
  {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  },

  {
    timestamps: false,
  }
);
