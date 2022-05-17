const { Model, DataTypes, DATE } = require("sequelize");
const sequelize = require("../config/connection");

class Booking extends Model { }

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        pets: {
            type: DataTypes.STRING,
            references: {
                model: 'pets',
                key: 'id'
            }
        },
        startDate: {
            type: DATE,
            required: true,
        },
        endDate: {
            type: DATE,
            required: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'booking',
    }
);

module.exports = Booking;