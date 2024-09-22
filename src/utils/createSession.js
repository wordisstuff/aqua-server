import {
    // FIFTEEN_MINUTES,
    ONE_DAY,
    smtp,
    TWO_HOURS,
} from '../constants/index.js';
import Sessions from '../db/models/session.js';
import randomToken from './randomToken.js';
import jwt from 'jsonwebtoken';

const createSession = async (id, verifyByEmail) => {
    return await Sessions.create({
        userId: id,
        accessToken: jwt.sign({ id, verifyByEmail }, smtp.jwtSecret),
        refreshToken: randomToken(30, 'base64'),
        accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });
};

export default createSession;
