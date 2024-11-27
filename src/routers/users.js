import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get(
    '/',
    ctrlWrapper(GetUsersController),
);
export default router;