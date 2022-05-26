const {Schema, model} = require("mongoose");


const blogSchema = new Schema(
    {
        text: {type: String, required: true },
        title: {type: String, require: true},
        password: {type: String, require: true},
        username: {type: String, reuqire: true},
    },
    {
        timestamps: true
    }
);


module.exports = blog = model('blog', blogSchema);

