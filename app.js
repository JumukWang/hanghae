const express = require('express');
const connect = require("./schema");
const blogRouter = require('./routes/blog');
const app = express();
app.use(express.json());
connect();

app.use('/blog', blogRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(8000);