import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { jsonParser } from '../constants/constants.js';
import validateBody from '../middlewares/validateBody.js';
import {
    addWaterRecordSchema,
    updateWaterRecordSchema,
    dateSchema,
    monthYearSchema,
} from '../validation/water.js';
import express from 'express';
import {
    addWaterRecord,
    updateWaterRecord,
    deleteWaterRecord,
    getDailyWaterRecord,
    getMonthlyWaterRecord,
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
    jsonParser,
    validateBody(updateWaterRecordSchema),
    ctrlWrapper(updateWaterRecord),
);
waterRouter.delete('/:id', jsonParser, ctrlWrapper(deleteWaterRecord));
waterRouter.get(
    '/daily/:date',
    jsonParser,
    validateBody(dateSchema),
    ctrlWrapper(getDailyWaterRecord),
);
waterRouter.get(
    '/monthly/:year/:month',
    jsonParser,
    validateBody(monthYearSchema),
    ctrlWrapper(getMonthlyWaterRecord),
);

export default waterRouter;
