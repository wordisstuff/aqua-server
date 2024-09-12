import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/user.js';
import Sessions from '../db/models/session.js';
import createSession from '../utils/createSession.js';

export const findUserByEmail = email => User.findOne({ email });
export const findUserById = id => User.findById(id);

export const registerUser = async userData => {
    const user = await findUserByEmail(userData.email);
    if (user) throw createHttpError(409, 'Email in use!');

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await User.create({
        ...userData,
        password: hashedPassword,
    });
};

//login code

export const loginUser = async data => {
    const user = await findUserByEmail(data.email);

    if (!user) throw createHttpError(404, 'User not found');

    const isEqual = await bcrypt.compare(data.password, user.password);
    if (!isEqual) throw createHttpError(401, 'Unauthorized');

    await Sessions.deleteOne({ userId: user._id });

    const newSession = await createSession({ userId: user._id });
    return await Sessions.create(newSession);


};

//logout code

export const logoutUser = (sessionId) => {
    return Sessions.deleteOne({ _id: sessionId });
};



//refresh session code

//update user code

//reset-token code

//reset password code

//google login&signup code
