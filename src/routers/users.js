import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { GetUsersController } from '../controllers/users.js';

const router = Router();
router.get(
    '/',
    ctrlWrapper(GetUsersController),
);
export default router;