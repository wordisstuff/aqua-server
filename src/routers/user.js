import { Router } from 'express';
// import validateBody from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { updateUserSchema } from '../validation/auth.js';
import { updateUserController } from '../controllers/user.js';

const router = Router();
router.patch(
    '/update',
    // validateBody(updateUserSchema),
    ctrlWrapper(updateUserController),
);

router.patch;
export default router;
