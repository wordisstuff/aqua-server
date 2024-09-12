import {
    registerUser,
    loginUser,
    logoutUser
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

//login code
export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
//logout code

export async function logoutUserController(req, res) {
    const { sessionId } = req.cookies;

    if (typeof sessionId === "string") {
        await logoutUser(sessionId);
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).end();

};

//refresh code

//update user code

//reset-token code

//reset password code

//google auth code

//confirm google auth code
