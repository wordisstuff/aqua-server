import { ONE_DAY, redirectUrl } from '../constants/index.js';
import {
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    refreshUser,
    checkEmailService,
    resetPasswordService,
} from '../services/auth.js';
//import jwt from 'jsonwebtoken';

export const registerUserController = async (req, res) => {
    await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message:
            'User registered! Please check your email to confirm your registration!',
    });
};
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
//refresh code
export const refreshUserController = async (req, res) => {
    const {
        _id,
        name,
        email,
        gender,
        photo,
        weight,
        activeTime,
        recommendedWater,
        verifyByEmail,
    } = req.user;

    const session = await refreshUser({
        userId: _id,
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
//login code
export const loginUserController = async (req, res) => {
    console.log(req.body);

    const session = await loginUser(req.body);

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

//update user code

//reset-token code

//reset password code

//google auth code

//confirm google auth code

export const checkEmailController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: 'Email is required' });
        }

        // Отримуємо токен від сервісу
        const token = await checkEmailService(email);

        // Повертаємо токен напряму у відповіді
        res.status(200).json({
            success: true,
            message: 'Email processed successfully',
            token, // Повертаємо токен без вкладень
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: { message: error.message },
        });
    }
};

// Контролер для скидання пароля
export const resetPasswordController = async (req, res) => {
    const { token, password } = req.body;

    // Переконайтесь, що token - це рядок
    if (typeof token !== 'string') {
        return res.status(400).json({
            status: 400,
            message: 'BadRequestError',
            data: {
                message: 'Bad Request',
                data: [
                    {
                        message: '"token" must be a string',
                        path: ['token'],
                        type: 'string.base',
                        context: { label: 'token', value: token },
                    },
                ],
            },
        });
    }

    try {
        const result = await resetPasswordService(token, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'BadRequestError',
            data: {
                message: 'Bad Request',
                data: [{ message: error.message }],
            },
        });
    }
};
