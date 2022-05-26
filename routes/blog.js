const express = require('express');
const router = express.Router();
const blog = require('../schema/schema');




router.get('/', async (req, res, next) => {
    try{
        const blogs = await blog.find({}).sort({createdAt: -1});
        return res.send({blogs})
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message});
    }
})
router.get('/:username', async (req, res, next) => {
    const {username} = req.params;
    try{
        const blogs = await blog.findOne({ _id: username});
        return res.send({ blogs })
    }catch{
        console.log(err);
        return res.status(500).send({err: err.message});
    }
})
router.get('/:title', async (req, res, next) => {
    const {title} = req.params;
    try{
        const blogs = await blog.findOne({_id: title});
        return res.send({ blogs })
    }catch{
        console.log(err);
        return res.status(500).send({err: err.message});
    }
})
router.post('/text', async (req, res, next) => {
    try{
        let {title, username, password, text} = req.body
        console.log(req.body)
        if(!text) return res.status(400).send({err : "text is required"});
        const blogs = new blog(req.body);
        await blog.create(blogs);
        return res.send(blogs)
    }catch(err){
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});
router.put('/update:password', async (req, res, next) => {
    try{
        const {password} = req.params;
        let {title, username, text} = req.body
        const blogs = await blog.findOne(password);
        await blog.updateOne({title, username, text});
        return res.send({text})
    }catch(err){
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});
router.delete('/delete:password', async (req, res, next) => {
    try{
        const {password} = req.params;
        const blogs = await blog.deleteOne(password)
        return res.send( blogs );
    }catch(err){
        console.error(err);
        return res.status(500).send({ err: err.message });
    }
});


module.exports = router;