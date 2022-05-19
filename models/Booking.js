const { Model, DataTypes, DATEONLY } = require("sequelize");
const sequelize = require("../config/connection");
const passport = require("../config/passport");
class Booking extends Model {}
Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    pets_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pets",
        key: "id",
      },
    },
    startDate: {
      type: DATEONLY,
      required: true,
    },
    endDate: {
      type: DATEONLY,
      required: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "booking",
  }
);
module.exports = Booking;
