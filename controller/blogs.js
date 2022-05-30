import * as blogRepo from '../data/blogs.js';
// 서버에있는 중요한 비지니스 로직을 갖고있자
// 데이터가 잘못되었을때 보여주기

export async function getblog(req, res) {
    const username = req.query.username; // 값이 들어있거나 , undefined
    const data = await (username 
    ? blogRepo.getAllUsername(username)
    : blogRepo.getAll());
    res.status(200).json(data);
}

export async function getblogs(req, res, next) {
    const id = req.params.id;
    const blogs = await blogRepo.getBlogId(id);
    if(blogs){
        res.status(200).json(blogs);
    }else{
        res.status(404).json({message: `blog id ${id} not found`});
    }
}

export async function create(req, res, next) {
    const {text, name, username } = req.body;
    const blogs = await blogRepo.create(text, name, username)
    res.status(201).json(blogs);
}

export async function update(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;

    const blogs = await blogRepo.update(id, text);
    if(blogs){
        res.status(200).json(blogs);
    }else{
        res.status(404).json({ message: `blog id ${id} not found`});
    }
}

export async function remove (req, res, next) {
    const id = req.params.id;
    const text = req.body.text;

    const blogs = await blogRepo.update(id, text);
    if(blogs){
        res.status(200).json(blogs);
    }else{
        res.status(404).json({ message: `blog id ${id} not found`});
    }
}