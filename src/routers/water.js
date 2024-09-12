import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { jsonParser } from '../constants/constants.js';

import express from 'express';
import {
    addWaterRecord,
    updateWaterRecord,
    deleteWaterRecord,
    getDailyWaterRecord,
    getMonthlyWaterRecord,
} from '../controllers/water.js';

const waterRouter = express.Router();

waterRouter.post('/', jsonParser, ctrlWrapper(addWaterRecord));
waterRouter.put('/:id', jsonParser, ctrlWrapper(updateWaterRecord));
waterRouter.delete('/:id', jsonParser, ctrlWrapper(deleteWaterRecord));
waterRouter.get('/daily/:date', jsonParser, ctrlWrapper(getDailyWaterRecord));
waterRouter.get(
    '/monthly/:year/:month',
    jsonParser,
    ctrlWrapper(getMonthlyWaterRecord),
);

export default waterRouter;
