import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    verifyEmailController,
    refreshUserController,
} from '../controllers/auth.js';
import { jsonParser } from '../constants/constants.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.post(
    '/signup',
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.get('/verify/:verifyToken', ctrlWrapper(verifyEmailController));

//login code

router.post(
    '/signin',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

//logout code

router.post('/logout', ctrlWrapper(logoutUserController));

//current code
router.get('/refresh', authenticate, ctrlWrapper(refreshUserController));
//update user code

//reset-token code

//reset password code

//google auth code

//confirm google auth code

export default router;
