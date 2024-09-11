import Joi from 'joi';

export const createWaterSchema = Joi.object({
    date: Joi.string().required(),
    amount: Joi.number().integer().required(),
    norm: Joi.number(),
});

// update Aqua schema code
