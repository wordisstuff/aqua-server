import Joi from 'joi';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// login user schema code
export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// update User schema code
export const updateUserSchema = Joi.object({
    name: { type: String },
    gender: { type: String, enum: ['female', 'male'], default: 'female' },
    photo: { type: String, default: null },
    weight: { type: Number, default: 0 },
    activeTime: { type: Number, default: 0 },
    recommendedWater: { type: Number, default: 1.5 },
});
// request reset email schema

// reset password schema

// Схема валідації для оновлення пароля
export const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

// confirm OAuth schema
export const confirmOAuthSchema = Joi.object({
    code: Joi.string().required(),
});
