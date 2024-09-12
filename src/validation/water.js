import Joi from 'joi';

export const createWaterSchema = Joi.object({
    userId: Joi.string(),
    date: Joi.date().optional(),
    amount: Joi.number().required(),
    minutes: Joi.number().integer().min(0).max(59).optional(),
    hours: Joi.number().integer().min(0).max(23).optional(),
});

// update Aqua schema code
