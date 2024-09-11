import Joi from 'joi';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// login user schema code

// update User schema code

// request reset email schema

// reset password schema

// confirm OAuth schema
