import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController } from '../controllers/auth.js';
import { jsonParser } from '../constants/constants.js';

const router = Router();

router.post(
    '/signup',
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

//login code

router.post(
    '/signin',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

//logout code

//refresh code

//update user code

//reset-token code

//reset password code

//google auth code

//confirm google auth code

export default router;
