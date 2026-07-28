const {Model,DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:{
                msg: "username must be a valid email address"
            },
            notNull: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    underscored: true,
    modelName: 'user'
})

module.exports = User