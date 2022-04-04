//importation de jsonwebtoken
const jwt = require("jsonwebtoken");
require("dotenv").config();

//export du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Id utilisateur non valide !";
    } else {
      res
        .status(200)
        .json({ message: "Vous êtes le propriétaire du compte !" });
      next();
    }
  } catch {
    res.status(403).json({
      message: "Action non autorisée !!",
    });
  }
};
