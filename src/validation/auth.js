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

// request reset email schema

// reset password schema

// Схема валідації для оновлення пароля
export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(), // Очікується рядок
    password: Joi.string().min(6).required(),
});

// Middleware для перевірки електронної пошти
export const validateCheckEmail = Joi.object({
    email: Joi.string().email().required(),
});

// confirm OAuth schema
