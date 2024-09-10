import { Router } from 'express';
import aquaRouter from './aqua.js';
import authRouter from './auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/aqua', authenticate, aquaRouter);

export default router;