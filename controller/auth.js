import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepo from '../data/auth.js';

const SecretKey = 'fdjsaklfghjwekoh';
const ExpiresDay = '2d';
const bcryptSalt = 12;

export async function signup (req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await userRepo.findUsername(username);
    if(found) {
        return res.status(409).json({ message: `${username} already exists `});
    }
    const hashed = await bcrypt.hash(password, bcryptSalt); // 존재한다면 hash로 만들어준다
    const userId = await userRepo.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
};

export async function signin (req, res) {
    const { username, password } = req.body;
    const user = await userRepo.findUsername(username);
    if (!user) { // 사용자가 유효한지 검사
        return res.status(401).json({ message: 'Invalid user or password '});
    }                                           // 상세하게 알려주지 않는 이유는 보안때문이다.
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password '});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

function createJwtToken(id) {
    return jwt.sign({id}, SecretKey, { expiresIn: ExpiresDay });
}

export async function me(req, res, next)  {
    const user = await userRepo.findId(req.userId);
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, userId: user.userId});
}

