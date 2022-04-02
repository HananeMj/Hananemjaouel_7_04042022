const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = require("../config/db");
const post = require("./Post.js");

//creating a model for user
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
post.belongsTo(User, { foreignKey: "userId", allowNull: false });

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("user-model synced successfully !");
  })
  .catch((err) => {
    console.log("Error syncing user-model !" + err);
  });

module.exports = User;
