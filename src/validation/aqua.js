import Joi from 'joi';

export const createAquaSchema = Joi.object(
    {
        date: Joi.string().required()
    }
);

// update Aqua schema code