import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/user.js';
import createSession from '../utils/createSession.js';
import { serverUrl, smtp } from '../constants/index.js';
import templateMaker from '../utils/templateMaker.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import { v4 } from 'uuid';
import Sessions from '../db/models/session.js';
import gravatar from 'gravatar';
import { validateCode } from '../utils/googleOAuth2.js';

export const findUserByEmail = email => User.findOne({ email });
export const findUserById = id => User.findById(id);

export const registerUser = async userData => {
    const { email } = userData;
    const user = await findUserByEmail(email);
    if (user) throw createHttpError(409, 'Email in use!');
    const verifyToken = v4();
    const html = templateMaker({
        name: email,
        link: `${serverUrl}/auth/verify/${verifyToken}`,
    });

    await sendEmail({
        from: smtp.from,
        to: email,
        subject: 'Verify your password',
        html,
    });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const photoUrl = gravatar.url(userData.email);
    return await User.create({
        ...userData,
        password: hashedPassword,
        verifyToken,
        photo: photoUrl,
    });
};

//verify code

export const verifyEmail = async verifyToken => {
    console.log('verifyEmail', verifyToken);
    const user = await User.findOne({ verifyToken });
    if (!user) throw createHttpError(404, 'User not found!');
    console.log('USER', user);
    let session = await Sessions.findOne({ userId: user._id });

    if (!session) {
        session = await createSession(user._id);
    }
    console.log('SESSION IN VERIFY SERVISE', session);
    const userWithToken = await User.findOneAndUpdate(
        { _id: user._id, verifyToken },
        { verifyByEmail: true, token: session.accessToken },
        { new: true },
    );
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

    const newSession = await createSession(user._id, user.verifyByEmail);
    console.log('newSession', newSession);

    return { user, session: newSession };
};

//logout code

export const logoutUser = sessionId => {
    return Sessions.deleteOne({ _id: sessionId });
};

//refresh session code
export const refreshUser = async ({ sessionId, refreshToken }) => {
    console.log(sessionId, refreshToken);
    const session = await Sessions.findOne({
        _id: sessionId,
        refreshToken,
    });

    if (!session) throw createHttpError(404, 'Session not found');

    if (new Date() > new Date(session.refreshTokenValidUntil)) {
        throw createHttpError(404, 'Session token expired');
    }
    // const updatedSession = await Sessions.findByIdAndUpdate(
    //     sessionId,
    //     {
    //         accessToken: jwt.sign({ id: session.userId }, smtp.jwtSecret),
    //         accessTokenValidUntil: new Date(Date.now() + 20000),
    //     },
    //     { new: true },
    // );
    await Sessions.deleteOne({ refreshToken });

    const newSession = await createSession(session.userId);
    return newSession;
};
//update user code

//reset-token code

//reset password code

//google login&signup code
const generateToken = user => {
    const payload = { id: user._id };
    const secret = process.env.JWT_SECRET; // Переконайтесь, що значення існує
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const options = { expiresIn: '1h' }; // Час життя токену

    return jwt.sign(payload, secret, options);
};

// Перевірка, чи існує електронна пошта в базі даних
export const checkEmailService = async email => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email not found');
    }

    const token = generateToken(user);
    user.tokens = { reset: token };
    await user.save();

    console.log('Token saved for user:', token);

    return token;
};

// Сервіс для скидання пароля користувача
export const resetPasswordService = async (token, newPassword) => {
    console.log('Looking for token:', token);

    const user = await User.findOne({ 'tokens.reset': token });
    if (!user) {
        console.error('User not found with the provided token');
        throw new Error('Invalid token');
    }

    console.log('User found:', user);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.tokens.reset = undefined; // Очистіть токен після використання
    await user.save();

    return { success: true, message: 'Password has been reset' };
};

export async function loginOrRegisterWithGoogle(code) {
    const ticket = await validateCode(code);
    const payload = ticket.getPayload();
    if (typeof payload === 'undefined') {
        throw createHttpError(401, 'Unauthorized');
    }
    const user = await User.findOne({ email: payload.email });
    const password = await bcrypt.hash(
        crypto.randomBytes(30).toString('base64'),
        10,
    );

    if (user === null) {
        const createdUser = await User.create({
            email: payload.email,
            name: payload.name,
            password,
        });

        let newUserSession = await createSession(createdUser._id);
        return newUserSession;
    }
    await Sessions.deleteOne({ _id: user._id });
    let session = await createSession(user._id);
    return session;
}
