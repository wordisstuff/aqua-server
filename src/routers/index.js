import { Router } from 'express';
import aquaRouter from './water.js';
import authRouter from './auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/water', authenticate, aquaRouter);

export default router;