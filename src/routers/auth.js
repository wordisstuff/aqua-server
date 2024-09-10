import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {registerUserSchema} from '../validation/auth.js';
import {registerUserController} from '../controllers/auth.js';
import { jsonParser } from '../constants/constants.js';

const router = Router();

router.post(
    '/register',
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

//login code

//logout code

//refresh code

//reset-email code

//reset password code

//google auth code

//confirm google auth code


export default router;