const express = require('express');
const router = express.Router();
const postmodel = require('../models/post');
const Comments = require('../models/comment');
const authMiddleware = require('../middleware/authuser');



router.get('/', async (req, res, next) => {
    try{
        const posts = await postmodel.find({}).sort({createdAt: -1});
        return res.send(posts)
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message});
    }
})
router.get('/:username', async (req, res, next) => {
    const {username} = req.params;
    try{
        const posts = await postmodel.findOne({username});
        return res.send( posts )
    }catch{
        console.log(err);
        return res.status(500).send({err: err.message});
    }
})
router.get('/:title', async (req, res, next) => {
    const {title} = req.params;
    try{
        const posts = await postmodel.findOne({title});
        return res.send( posts )
    }catch{
        console.log(err);
        return res.status(500).send({err: err.message});
    }
})
router.post('/posts', authMiddleware, async (req, res, next) => {
    const { title, username, password, text } = req.body;
    const { user } = res.locals;
    try{
        if(!text) return res.status(400).send({err : "text is required"});
        await postmodel.create({ title, username, password, text });
        return res.send(req.body);
    }catch(err){
        console.log(err);
        return res.status(500).send({ err: err.message });
    };
});
router.put('/update:password', authMiddleware, async (req, res, next) => {
    const {password} = req.params;
    const {title, username, text} = req.body
    try{
        const posts = await postmodel.findByIdAndUpdate(password, { $set: {title, username, text}});
        await postmodel.updateOne({title, username, text});
        return res.send(posts);
    }catch(err){
        console.log(err);
        return res.status(500).send({ err : err.message });
    };
});
router.delete('/delete:postId', authMiddleware, async (req, res, next) => {
    const { postId } = req.params;
    const { password } = req.body;
  
    const posts = await postmodel.findOne({ postId: postId, password: password });
    const comment = await Comments.findOne({ postId: postId })
    if (posts) {
      await postmodel.deleteOne({ postId: postId })
      await Comments.deleteMany({postId: postId})
      res.send({ result: "success" })
    }  else {
      res.send({ result: "fail" })
    }
  })

module.exports = router;