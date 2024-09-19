import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    registerUserSchema,
    loginUserSchema,
    validateCheckEmail,
    resetPasswordSchema,
} from '../validation/auth.js';
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    verifyEmailController,
    refreshUserController,
    checkEmailController,
    resetPasswordController,
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
router.get('/refresh', authenticate, ctrlWrapper(refreshUserController));

// Check email route
router.post(
    '/check-email',
    validateBody(validateCheckEmail),
    ctrlWrapper(checkEmailController),
);

// Reset password route
router.patch(
    '/reset-password',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);

export default router;
