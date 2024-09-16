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
        link: `${tps.domain}${authDb.port}/auth/verify/${verifyToken}`,
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
    const user = await User.findOneAndUpdate(
        { verifyToken },
        { verifyByEmail: true },
        { new: true },
    );
    if (!user) throw createHttpError(404, 'User not found!');
    const session = await createSession(user._id);

    return { session, user };
};

// const verifyToken = jwt.sign({ sub: email }, smtp.jwtSecret, {
//     expiresIn: '15m',
// });
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

export const logoutUser = sessionId => {
    return Sessions.deleteOne({ _id: sessionId });
};

//refresh session code

//update user code

//reset-token code

//reset password code

//google login&signup code
