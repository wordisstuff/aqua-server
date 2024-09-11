import { registerUser, loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
    console.log('BODY', req.body);
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

    console.log("SESSION", session);

    res.status(200).json({
        status: 200,
        message: 'Successfully logged a user!',
        data: session,
    });




};
//logout code

//refresh code

//update user code

//reset-token code

//reset password code

//google auth code

//confirm google auth code
