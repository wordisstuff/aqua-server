import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../db/models/user.js';
import { smtp } from '../constants/index.js';

export const findUserByEmail = email => User.findOne({ email });
export const findUserById = id => User.findById(id);
export const updateUserWithToket = id => {
    const token = jwt.sign({ id }, smtp.jwtSecret);
    return User.findByIdAndUpdate(id, { token }, { new: true });
};

export const registerUser = async userData => {
    const user = await findUserByEmail(userData.email);
    if (user) throw createHttpError(409, 'Email in use!');

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
        ...userData,
        password: hashedPassword,
    });
    return updateUserWithToket(newUser._id);
};

//login code

//logout code

//refresh sesion code

//update user code

//reset-token code

//reset password code

//google login&signup code
