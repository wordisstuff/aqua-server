import { ONE_DAY, redirectUrl } from '../constants/index.js';
import {
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    refreshUser,
    loginOrRegisterWithGoogle,
} from '../services/auth.js';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User, { serializeUser } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import templateMakerResetPwd from '../utils/templateMakerResetPwd.js';

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message:
            'User registered! Please check your email to confirm your registration!',
        data: { user: serializeUser(user) },
    });
};

//login code
export const loginUserController = async (req, res) => {
    console.log(req.body);

    const { user, session } = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            user: serializeUser(user),
            token: session.accessToken,
        },
    });
};

//logout code
export async function logoutUserController(req, res) {
    const { sessionId } = req.cookies;

    if (typeof sessionId === 'string') {
        await logoutUser(sessionId);
    }

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).end();
}

//Verify code
export const verifyEmailController = async (req, res) => {
    const { verifyToken } = req.params;

    const { session, userWithToken } = await verifyEmail(verifyToken);
    // res.clearCookie('sessionId');
    // res.clearCookie('refreshToken');

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    return res.redirect(`${redirectUrl}/verify/${userWithToken.token}`);
};

//refresh session code
export const refreshUserController = async (req, res) => {
    const session = await refreshUser({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    console.log('SESION', session);
    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            token: session.accessToken,
        },
    });
};

//reset-token code

//reset password code

//google auth code

//confirm google auth code
export const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email });
        if (!user) {
            throw createHttpError(404, 'User not found!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            status: 200,
            message: 'Password has been successfully reset.',
            data: {},
        });
    } catch (e) {
        console.log(e);
        next(createHttpError(401, 'Token is expired or invalid.'));
    }
};

// Налаштування Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to send emails');
    }
});

export const sendResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Перевірка валідності email
        if (!email) {
            throw createHttpError(400, 'Email is required');
        }

        // Перевірка, чи існує користувач з таким email
        console.log('Searching for user with email:', email);
        const user = await User.findOne({ email });
        if (!user) {
            throw createHttpError(404, 'User not found!');
        }
        console.log('User found:', user);

        // Генерація JWT токену для скидання пароля
        console.log('Генерація токену для:', user.email);
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '5m',
        });
        console.log('Токен згенеровано:', token);

        // Створення посилання для скидання пароля
        const resetLink = `${redirectUrl}/forgotPassword?token=${token}`;
        const html = templateMakerResetPwd({
            name: email,
            link: resetLink,
        });
        // Налаштування email
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Password Reset',
            html,
        };
        // Надсилання email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: 200,
            message: 'Reset password email has been successfully sent.',
            data: {},
        });
    } catch (error) {
        if (
            error.message.includes('Email is required') ||
            error.message.includes('User not found')
        ) {
            next(error);
        } else {
            next(
                createHttpError(
                    500,
                    'Failed to send the email, please try again later.',
                ),
            );
        }
    }
};

transporter.sendMail(
    {
        from: process.env.SMTP_FROM,
        to: 'test@example.com', // замініть на свою адресу
        subject: 'Test Email',
        text: 'This is a test email',
    },
    (error, info) => {
        if (error) {
            console.log('Error sending test email:', error);
        } else {
            console.log('Test email sent:', info.response);
        }
    },
);

export async function getOAuthUrlController(req, res) {
    const url = generateAuthUrl();
    res.send({
        status: 200,
        message: 'Succesfully get Google OAuth',
        data: { url },
    });
}

export async function confirmOAuthController(req, res) {
    const { code } = req.body;
    const session = await loginOrRegisterWithGoogle(code);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: 'login with Google completed',
        data: {
            token: session.accessToken,
        },
    });
}

export const currentUserController = (req, res) => {
    res.status(200).json({
        user: serializeUser(req.user),
    });
};
