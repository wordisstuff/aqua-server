import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { createWaterSchema } from '../validation/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createWaterController } from '../controllers/water.js';
import { jsonParser } from '../constants/constants.js';

const waterRouter = Router();

waterRouter.post(
    '/',
    jsonParser,
    validateBody(createWaterSchema),
    ctrlWrapper(createWaterController),
);

// get water by id code

// update water code

// delete water code

// get water date codes
// day code

// week code

// month code
export default waterRouter;
