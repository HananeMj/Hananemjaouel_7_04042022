//importation de jsonwebtoken
const jwt = require("jsonwebtoken");
require("dotenv").config();

//export du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    //récupération du token
    const token = req.headers.authorization.split(" ")[1];
    //décoder le token
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    //récupérer le userId du token
    const userId = decodedToken.userId;
    //vérifier si le userId correspond à l'userid du token sinon erreur

    if (req.body.userId && req.body.userId !== userId) {
      throw "Id utilisateur non valide !";
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      message: "Action non autorisée !!",
    });
  }
};
