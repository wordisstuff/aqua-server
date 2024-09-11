import createHttpError from 'http-errors';
import { smtp } from '../constants/index.js';
import jwt from 'jsonwebtoken';
import { findUserById } from '../services/auth.js';

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(
            createHttpError(401, 'Please provide Authorization header'),
        );
    }
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }
    const secret = smtp.jwtSecret;
    const { id } = jwt.verify(token, secret);

    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
        next(createHttpError(401, 'No authorized!'));
    }
    req.user = user;
    next();
};
export default authenticate;
