const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user-model");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ").join("_")[1];
  const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    if (decodedToken.userId == user.id) {
      return res
        .status(200)
        .json({ message: "vous êtes le propriétaire de ce compte !" });
    } else {
      return res.status(403).json({ message: "accès refusé !" });
    }
  });
  next().catch((error) => {
    res.status(401).json({ message: "accès refusé !:" + error });
  });
};
