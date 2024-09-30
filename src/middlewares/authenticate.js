import createHttpError from 'http-errors';
import User from '../db/models/user.js';
import Sessions from '../db/models/session.js';

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log('TOKEN BEARER', authorization);
    console.log(req.body);
    if (!authorization) {
        return next(
            createHttpError(401, 'Please provide Authorization header'),
        );
    }
    const [bearer, accessToken] = authorization.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }
    const session = await Sessions.findOne({ accessToken });

    if (!session) {
        console.log('Session not found!!');
        next(createHttpError(401, 'Session not found!!'));
        return;
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
        console.log('Access token expired');
        next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findById(session.userId);
    if (!user) {
        next(createHttpError(401, 'Session not found!'));
    }
    console.log(' USER AUTH', user);
    req.user = user;
    next();
};
export default authenticate;
