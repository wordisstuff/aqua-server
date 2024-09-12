import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
    amount: Joi.number().required(),
    hours: Joi.number().integer().min(0).max(23).optional(),
    minutes: Joi.number().integer().min(0).max(59).optional(),
    date: Joi.date().optional(),
    owner: Joi.string(),
});

export const updateWaterRecordSchema = Joi.object({
    amount: Joi.number().required(),
    date: Joi.date().optional(),
});

export const monthYearSchema = Joi.object({
    year: Joi.string()
        .regex(/^\d{4}$/)
        .required(),
    month: Joi.string()
        .regex(/^(0?[1-9]|1[012])$/)
        .required(),
});

export const dateSchema = Joi.object({
    date: Joi.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in format YYYY-MM-DD',
        }),
});
