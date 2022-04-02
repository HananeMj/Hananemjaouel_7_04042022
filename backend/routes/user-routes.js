//import de express
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user-controller");
const password = require("../middleware/password-valid");

//routes user
router.post("/signup", password, userController.signup);
router.post("/login", userController.login);
router.get("/:id", auth, userController.getOneUser);
router.get("/all", auth, userController.getAllUsers);

//export du routeur
module.exports = router;
