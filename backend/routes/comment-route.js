/*const express = require("express");
const router = express.Router();

const commentControll = require("../controllers/comments-controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, commentControll.createComment);
router.delete("/:id", auth, commentControll.deleteComment);
router.put("/:id", auth, multer, commentControll.modifyComment);
router.get("/", auth, commentControll.getAllComments);

module.exports = router;*/
