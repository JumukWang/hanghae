const {Schema, model} = require("mongoose");


const postSchema = new Schema(
    {
        postId: {type: Number},
        title: {type: String, required: true},
        username: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        text: {type: String, required: true },
        date: { type: Date, default: Date.now}
    },
    
);


module.exports = model('Post', postSchema);