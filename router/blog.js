import express from 'express';
import * as blogController from '../controller/blogs.js';
const router = express.Router();
import { body } from 'express-validator'; // body 
import { validate } from '../middleware/validator.js'; // 유효성을 검사해서 결과를 보여줌

// 유효성 검사
// sanitization 을 통해 데이터 일관성을 지키자... 
const validateBlog = [
    body('text')
        .trim() // space 없애기  sanitization
        .isLength({min:3}) // text 글자 수 정하기
        .withMessage("세글자 이상 입력해주세요"),
    validate
];

router.get('/', blogController.getblog)

router.get('/:id', blogController.getblogs);

router.post( '/', validateBlog, blogController.create);

router.put('/:id', validateBlog, blogController.update);

router.delete('/:id', blogController.remove);

export default router;