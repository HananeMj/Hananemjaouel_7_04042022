const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "Groupomania",
  "root",
  "Azhkd468(gdlzlqjgyUiojgklo1",

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
