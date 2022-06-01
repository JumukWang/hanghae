const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./router/user');
const postRouter = require('./router/post');
const commentRouter = require('./router/comment');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/sparta02", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


app.use('/blog', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);


// app.use("/api", express.urlencoded({ extended: false }), router);
// app.use(express.static("assets"));

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});


