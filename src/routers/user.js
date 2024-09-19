import { Router } from 'express';
// import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { jsonParser } from '../constants/constants.js';
import { currentUserController } from '../controllers/user.js';

const router = Router();
router.get('/current', ctrlWrapper(currentUserController));

export default router;
