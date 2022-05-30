import express from 'express';
import { body } from 'express-validator'; // body 
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();

const validateSignin = 
[
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password should be at least 5 characters'),
    validate,
];

const validateSignup = 
[
    ...validateSignin,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL()
        .withMessage('invalid URL')
        .optional({ nullable: true, checkFalsy: true }),
    validate,
]
        

router.post('/signup', isAuth, validateSignup, authController.signup);
router.post('/signin', isAuth, validateSignin, authController.signin);
router.get('/me', isAuth, authController.me)

export default router;