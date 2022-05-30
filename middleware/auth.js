import jwt from 'jsonwebtoken';
import * as userRepo from '../data/auth.js';

const AUTH_ERROR = { message: 'authentication Error' };

export const isAuth = async (req, res, next) => { // 비동기 콜백함수 미들웨어 함수
    const authHeader = req.get('Authorization'); // 헤더 키 벨류를 헤더에 할당
    console.log(authHeader, "= header");
   
    if(!(authHeader && authHeader.startsWith('Bearer'))) { // 헤더가 존재하지 않거나 bearer로 시작하지 않으면 검증할 수 없으므로 401에러
        return res.status(401).json(AUTH_ERROR);
    }; 

    const token = authHeader.split(' ')[1]; // 다음 토큰을 읽어야하니까 스플릿으로 분리
    console.log(token, "= token");
    jwt.verify(
        token,
        'fdjsaklfghjwekoh',
        console.log(token),
        async(error, decoded) => {
            if(error){
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepo.findId(decoded.id)
            console.log(decoded.id,"= id");
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id; // req.customData
            next();
        }
    );
};
