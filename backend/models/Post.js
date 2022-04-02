const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = require("../config/db");

//creating a model for posts
const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachments: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

//Post.hasMany(comment, {
//foreignKey: "post_id",
//onDelete: "CASCADE",
//onUpdate: "CASCADE",
//});
//comment.belongsTo(Post, { foreignKey: "post_id" });

sequelize
  .sync({})
  .then(() => {
    console.log("post-model synced successfully !");
  })
  .catch((err) => {
    console.log("Error syncing post-model !" + err);
  });

module.exports = Post;
