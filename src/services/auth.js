import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/user.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use!');

  const cryptedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: cryptedPassword,
  });
};

//login code

//logout code

//refresh sesion code

//update user code

//reset-token code

//reset password code

//google login&signup code


