import Joi from 'joi';

export const createWaterSchema = Joi.object(
    {
        date: Joi.string().required(),
        amount:Joi.number().required(),
        norm: Joi.number()
    }
);

// update Aqua schema code