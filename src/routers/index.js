import { Router } from 'express';
import waterRouter from './water.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import usersRouter from './users.js';
import authenticate from '../middlewares/authenticate.js';
import { jsonParser } from '../constants/constants.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', authenticate, userRouter);
router.use('/water', authenticate, jsonParser, waterRouter);
router.use('/users',jsonParser,usersRouter)

export default router;
