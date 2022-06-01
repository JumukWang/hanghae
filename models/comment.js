const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    postId: Number,
    commentId: Number,
    comment: {
     type: String,
     required: true
    },
    date: {
     type: Date,
     default: Date.now
     }
    });

  module.exports = mongoose.model('Comment', commentSchema); 