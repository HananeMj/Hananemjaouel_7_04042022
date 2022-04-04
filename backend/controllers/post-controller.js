const Post = require("../models/post-model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");

//Créer un post
module.exports.createPost = (req, res) => {
  if (req.file) {
    Post.create({
      userId: req.body.userId,
      content: req.body.content,
      file: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      date: Date.now(),
    })
      .then(() => {
        res.status(201).json({ message: "Post crée !" });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } else {
    Post.create({
      content: req.body.content,
      userId: req.body.userId,
      date: Date.now(),
    })
      .then(() => {
        res.status(201).json({ message: "Post crée !" });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }
};

//Supprimer un post
module.exports.deletePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post && post.userId == userId) {
        const filename = post.imageUrl.split("/images/")[1];
        //on supprime le fichier de la base de données
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "post supprimé !" }))
            .catch((error) => res.status(400).json({ message: error.message }));
        });
      } else {
        res.status(403).json({ message: "Action non autorisé!!" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

//récupère tous les posts
exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

//Modifier le post
module.exports.UpdatePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;

  Post.findOne({ id: req.params.id })
    .then((sauce) => {
      if ((sauce && sauce.userId == userId) || isAdmin == true) {
        const postObject = req.file
          ? {
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        Post.updateOne(
          { id: req.params.id },
          { ...postObject, id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modifié !" }))
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        res.status(403).json({ message: "Action non autorisé!!" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

//Retrouver un post
module.exports.getOnePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      res.status(200).json({ message: "Voici le post !" });
      console.log(post);
    })
    .catch((error) => {
      res.status(400).json(error);
      console.log("Contenu non trouvé ");
    });
};
