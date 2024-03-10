const express = require('express');
const app = express(); //initialize variable app here which makes api request and initilize server
const cors = require("cors");


app.use(express.json());
app.use(cors());

const db = require('./models');     //when an api call is made it checks if tables exists  in models if not create table

// routers 
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const UsersRouter = require('./routes/Users');
app.use("/auth", UsersRouter);



db.sequelize.sync().then(() => {
    app.listen(3002, () => {        //function runs this
        console.log("Server is running....");
    });
});

