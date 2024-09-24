import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import uploader from '../middlewares/multer.js';
import { updateUserController } from '../controllers/user.js';
// import validateBody from '../middlewares/validateBody.js';
// import { updateUserSchema } from '../validation/auth.js';

const router = Router();
router.patch(
    '/update',
    uploader.single('photo'),
    // validateBody(updateUserSchema),
    ctrlWrapper(updateUserController),
);

router.patch;
export default router;
