const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const cryptoJs = require("crypto-js");
const User = require("../models/user-model");

//const post = require("../models/Post");
require("dotenv").config();

//créer un nouvel utilisateur
exports.signup = (req, res) => {
  console.log(req.body);
  const hash = bcrypt.hashSync(req.body.password, 10);

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hash,
  };

  User.create(user)
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))

    .catch((error) => res.status(400).json({ message: error.message }));
};

//connexion utilisateur
exports.login = (req, res) => {
  //retrouver l'email crypté
  //const emailCryptedResearch = cryptoJs
  //.HmacSHA256(req.body.email, `${process.env.SECRET_KEY}`)
  //.toString();
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            isAdmin: user.isAdmin,
            userId: user.id,
            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin,
              },
              `${process.env.SECRET_TOKEN}`,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

//retrouver un user
exports.getOneUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })

    .then((user) => {
      res.status(200).json({ user });
    })

    .catch((error) => res.status(400).json({ message: error.message }));
};

//supprimer un user
exports.deleteUser = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((res) => {
      res.status(200).json({ message: "Profil supprimé !" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: "Utilisateur non trouvé !" });
    });
};
