const express = require("express");
const router = express.Router();

const postControll = require("../controllers/post-controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, postControll.createPost);
router.delete("/:id", auth, postControll.deletePost);
router.put("/:id", auth, multer, postControll.UpdatePost);
router.get("/all", postControll.getAllPosts);
router.get("/:id", postControll.getOnePost);

module.exports = router;
