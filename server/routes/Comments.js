const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")

const { Comments } = require("../models")

router.get('/byPost/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId
    const comments = await Comments.findAll({ where: { PostId: postId } })
    res.json(comments);

});
router.post("/", validateToken, async (req, res) => {

    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);  //async - data to be inserted in the form by user
    res.json(comment);

})

module.exports = router;