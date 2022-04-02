"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        onDelete: "CASCADE",
        OnUpdate: "CASCADE",
        foreignKey: { name: "userId", allowNull: false },
        hooks: true,
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: DataTypes.STRING,
      isAdmin: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
