const jwt = require("jsonwebtoken");
const Post = require("../models/post-model");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);

  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (decodedToken.userId == post.userid) {
        console.log({ message: "Vous êtes le propriétaire du post !" });
      } else if (decodedToken.isAdmin) {
        console.log({ message: "Vous êtes administrateur !" });
      } else {
        return res
          .status(403)
          .json({ message: "Accès refusé car vous n'avez pas les droits!" });
      }
      next();
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
