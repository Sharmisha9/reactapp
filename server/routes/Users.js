const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models")   //posts here is modeL
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken")      //dign cretes token

router.post("/", async (req, res) => {

    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {                //10 is how it takes to calculate
        Users.create({
            username: username,
            password: hash,
        });

        res.json("SUCCESS");
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (!user) return res.json({ error: "User doesn't exist" });

    const match = bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Wrong username or password" });

    const accessToken = sign({ username: user.username, id: user.id }, "importantsecret");
    res.json({ token: accessToken });
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router;