const express = require('express');
const Comments = require('../models/comment');
const post = require('../models/post')
const router = express.Router();
const authMiddleware = require('../middleware/authuser');

router.get("/comment:postId",  async (req, res, next) => { 
    const { postId } = req.params;
    const comment = await Comments.find({ postId : postId }).sort("-commentId"); 
    // console.log(comment)
    res.json({ comment: comment });
});

router.post('/comment', authMiddleware, async (req, res, next) => {
    try{
        const { user } = req.locals;
        const { postId, comment, name } = req.body
        
        const comments = await Comments.find().sort({date: -1});
        let {commentId} = 0;
        if(comments){
            return commentId++;
        };
        await Comments.create({commentId, comment, name, user});

        res.send({ result: "succese" })
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }  
});

router.put('/comment/:commentId', authMiddleware, async (req, res, next) => {
    try{
        const { commentId } = req.params;
        const { comment } = req.body;
        // const { user } = res.locals;

        const Comment = await Comments.findByIdAndUpdate(commentId, { $set: { comment }});
        await post.updateOne({ comment });
        return res.send(Comment)
    }catch(err){
        console.log(err);
        return res.status(500).send({ err : err.message });
    }
});

router.delete('/comment/:commentId',authMiddleware, async (req, res, next) => {
    const { commentId } = req.params;
    const { user } = res.locals;
    const { name } = res.body
    try{
        if ( name === user.username ){
            await Comments.deleteOne({ commentId: commentId })
            return res.send({ result: "성공! "});
        }    
    }catch(err){
        console.error(err);
        return res.status(500).send({ err: err.message });
    }
});


module.exports = router;