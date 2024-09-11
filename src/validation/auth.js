import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// login user schema code

// update User schema code

// request reset email schema

// reset password schema

// confirm OAuth schema