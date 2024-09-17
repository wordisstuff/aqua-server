import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/user.js';
import createSession from '../utils/createSession.js';
import { authDb, smtp, tps } from '../constants/index.js';
import templateMaker from '../utils/templateMaker.js';
// import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import { v4 } from 'uuid';
import Sessions from '../db/models/session.js';

export const findUserByEmail = email => User.findOne({ email });
export const findUserById = id => User.findById(id);

export const registerUser = async userData => {
    const { email } = userData;
    const user = await findUserByEmail(email);
    if (user) throw createHttpError(409, 'Email in use!');
    const verifyToken = v4();
    console.log('VERIFYTOKEN', verifyToken);
    const html = templateMaker({
        name: email,
        link: `${tps.domain}/auth/verify/${verifyToken}`,
    });

    await sendEmail({
        from: smtp.from,
        to: email,
        subject: 'Verify your password',
        html,
    });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({
        ...userData,
        password: hashedPassword,
        verifyToken,
    });
};

//verify code

export const verifyEmail = async verifyToken => {
    console.log('verifyEmail');
    const user = await User.findOne({ verifyToken });
    if (!user) throw createHttpError(404, 'User not found!');

    const session = await createSession(user._id);
    console.log(session);
    const userWithToken = await User.findOneAndUpdate(
        { _id: user._id, verifyToken },
        { verifyByEmail: true, token: session.accessToken },
        { new: true },
    );
    console.log(userWithToken);

    return { session, userWithToken };
};
// login code
export const loginUser = async userData => {
    const user = await findUserByEmail(userData.email);
    console.log('USER', user);
    if (!user) throw createHttpError(404, 'User not found');

    const isEqual = await bcrypt.compare(userData.password, user.password);
    if (!isEqual) throw createHttpError(401, 'Unauthorized');
    console.log('isEqual', isEqual);
    await Sessions.deleteOne({ userId: user._id });

    const newSession = await createSession(user._id);
    console.log('newSession', newSession);
    return await Sessions.create(newSession);
};

//logout code

export const logoutUser = sessionId => {
    return Sessions.deleteOne({ _id: sessionId });
};

//refresh session code

//update user code

//reset-token code

//reset password code

//google login&signup code
