import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    registerUserSchema,
    loginUserSchema,
    resetPasswordSchema,
    emailSchema,
} from '../validation/auth.js';
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    verifyEmailController,
    sendResetEmail,
    resetPassword,
    currentUserController,
} from '../controllers/auth.js';
import { jsonParser } from '../constants/constants.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();
//import bcrypt from 'bcrypt';
//import User from '../db/models/user.js';

router.post(
    '/signup',
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.get('/verify/:verifyToken', ctrlWrapper(verifyEmailController));

// Login route
router.post(
    '/signin',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

// Logout route
router.post('/logout', ctrlWrapper(logoutUserController));

// Refresh user route
router.get('/current', authenticate, ctrlWrapper(currentUserController));
// router.get('/refresh', authenticate, ctrlWrapper(refreshUserController));

// Check email route
router.post(
    '/send-reset-email',
    validateBody(emailSchema),
    ctrlWrapper(sendResetEmail),
);

// Reset password route

router.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPassword),
);

export default router;
