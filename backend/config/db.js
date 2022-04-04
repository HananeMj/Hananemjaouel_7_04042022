const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "groupomania",
  "root",
  "12345678",

  {
    host: "localhost",
    dialect: "mysql",
  }
);

//test db
sequelize
  .authenticate()
  .then(() => console.log("Database successfully connected !"))
  .catch((err) => console.log("Error connecting to database" + err));

module.exports = sequelize;
