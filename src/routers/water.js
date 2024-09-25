import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { jsonParser } from '../constants/constants.js';
import validateBody from '../middlewares/validateBody.js';
import validateParams from '../middlewares/validateParams.js';
import isValidId from '../middlewares/isValidId.js';
import {
    addWaterRecordSchema,
    updateWaterRecordSchema,
    dateSchema,
} from '../validation/water.js';
import express from 'express';
import {
    addWaterRecord,
    updateWaterRecord,
    deleteWaterRecord,
    getDailyWaterRecord,
    getMonthlyWaterRecord,
    getWaterRecordByIdController,
    getWaterRecordsByDay,
} from '../controllers/water.js';

const waterRouter = express.Router();

waterRouter.post(
    '/',
    jsonParser,
    validateBody(addWaterRecordSchema),
    ctrlWrapper(addWaterRecord),
);
waterRouter.patch(
    '/:id',
    isValidId,
    jsonParser,
    validateBody(updateWaterRecordSchema),
    ctrlWrapper(updateWaterRecord),
);
waterRouter.delete(
    '/:id',
    isValidId,
    jsonParser,
    ctrlWrapper(deleteWaterRecord),
);
waterRouter.get(
    '/daily/:date',
    jsonParser,
    validateParams(dateSchema),
    ctrlWrapper(getDailyWaterRecord),
);
waterRouter.get(
    '/monthly/:year/:month',
    jsonParser,
    ctrlWrapper(getMonthlyWaterRecord),
);
waterRouter.get(
    '/:id',
    isValidId,
    jsonParser,
    ctrlWrapper(getWaterRecordByIdController),
);

waterRouter.get(
    '/:id/daily/:date',
    isValidId,
    jsonParser,
    ctrlWrapper(getWaterRecordsByDay),
);
export default waterRouter;
