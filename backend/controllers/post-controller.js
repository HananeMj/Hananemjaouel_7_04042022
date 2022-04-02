const Post = require("../models/Post");
const user = require("../models/user-model");
//const comment = require("../models/comments-model");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");

//Créer un post
module.exports.createPost = (req, res) => {
  const postObject = JSON.parse(req.body.post);
  console.log(JSON.stringify(postObject));
  const post = new Post({
    ...postObject,
    userId: req.body.user_id,
    title: req.body.title,
    picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    content: req.body.content,
    date: Date.now(),
  });
  let { title, content, attachments, user_id, date } = req.body;
  post
    .create({ title, content, attachments, user_id, date })
    .then((post) => {
      console.log(post), res.status(201).json({ message: "post crée !" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

//Supprimer un post
exports.deletePost = (req, res) => {
  //recherche l'objet dans la base de données
  Post.findOne({ id: req.params.id })
    .then((post) => {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;
      if (post.userId !== userId) {
        res
          .status(403)
          .json({
            message: "Seul l'utilisateur qui a créé le post peut le supprimer",
          })
          .catch((error) => res.status(400).json({ error }));
      } else {
        //récupération du nom du fichier via un split de l'url
        const filename = post.imageUrl.split("/images/")[1];
        //suppression du fichier
        fs.unlink(`images/${filename}`, () => {
          //fonction qui permet de supprimer une sauce
          Post.deleteOne({ id: req.params.id })
            //suppression du post via le paramètre id
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//récupère tous les posts
exports.getAllPosts = (req, res) => {
  Post.findAll({ include: user })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};
