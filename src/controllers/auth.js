import { ONE_DAY, redirectUrl } from '../constants/index.js';
import {
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    refreshUser,
} from '../services/auth.js';
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
