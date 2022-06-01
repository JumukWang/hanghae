const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authuser');
const users = require('../models/user');
const Joi = require('joi');

const joiSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(), 
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")).required(), 
    confirmPassword: Joi.string().required(),
});

router.post('/signup', async (req, res, next) => {
    const { username, password, confirmPassword } = await joiSchema.validateAsync(req.body);

    if (password !== confirmPassword){
        res.status(400).send({
            errorMessage: "패스워드가 확인란과 동일하지 않습니다."
        });
        return;
    }

    if (password.includes(username)) {
        res.status(400).send({
          errorMessage: "패스워드에 아이디가 포함되어있습니다.",
        });
        return;
    }

    const existUser = await users.find({username});
    if(existUser.length){
        res.status(400).send({
            errorMessage: "이미 가입된 이메일 또는 닉네임이 있다"
        });
        return;
    }
    const user = new users({ username, password })
    await user.save();

    res.sendStatus(201); // 그냥 send를 하면 200 반환
    // 하지만 created라는 의미로 201 status가 더 적합
})

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;

    const user = await users.findOne({ email, password }).exec();

    if(!user){
        res.status(400).send({
            errorMessage: '이메일 또는 패스워드가 틀렸습니다'
        });
        return;
    }

    const token = jwt.sign({ userId: user.userId }, 'secret-key');
    res.send({
        token,
    });
})



router.get('/users/me', authMiddleware, async (req, res, next) => {
    const { user } = res.locals; // user변수에 locals에있는 객체안에있는 키가 구조분해할당이 되어 들어간다 
    // 여기에 사용자 정보가 들어있다  인증용도
    res.send({
        user,
    });
})

module.exports = router;