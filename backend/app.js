//import packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/db");
const cors = require("cors");
require("mysql2");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//import routes
const userRoute = require("./routes/user-routes");
const postRoute = require("./routes/post-route");
//const commentRoute = require("./routes/comment-route");

const app = express();

const connecting = async function () {
  try {
    await sequelize.authenticate();
    console.log("successfully connected to DB mysql !");
  } catch (error) {
    console.log("Error connecting to Db ! " + error);
  }
};
connecting();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());

/*app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);*/

//app.use permet d'attribuer un middleware à une route spécifique de l'application.
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
//app.use("/api/comment", commentRoute);

module.exports = app;
