import { Router } from 'express';
import waterRouter from './water.js';
import authRouter from './auth.js';
import authenticate from '../middlewares/authenticate.js';
import { jsonParser } from '../constants/constants.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/water', authenticate, jsonParser, waterRouter);

export default router;
