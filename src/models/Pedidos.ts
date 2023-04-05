import db from "../infra/database";
import { DataTypes } from "sequelize";
import Usuarios from "./Usuarios";

const Pedidos = db.define(
  "Pedidos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuarios,
            key: "id"
        }
      },
    valor: {
        type: DataTypes.INTEGER,
      },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
  },
  {
    tableName: "pedidos",
    timestamps: true
  }
);

export default Pedidos;