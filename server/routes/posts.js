const express = require("express");
const router = express.Router();

const { Posts } = require("../models");   //posts here is model
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/",
    async (req, res) => {
        const listOfPosts = await Posts.findAll()
        res.json(listOfPosts)
    });

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post);
});


router.post("/", validateToken, async (req, res) => {

    const post = req.body;
    await Posts.create(post);  //async - data to be inserted in the form by user
    res.json(post);
})

module.exports = router;