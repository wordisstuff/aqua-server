// import { readFile } from 'node:fs/promises';
import createHttpError from 'http-errors';
import { OAuth2Client } from 'google-auth-library';
import { OAuth, redirectUrl } from '../constants/index.js';

const googleOAuth2Client = new OAuth2Client({
    clientId: OAuth.clientId,
    clientSecret: OAuth.clientSecret,
    redirectUri: `${redirectUrl}/auth/google`,
});

export function generateAuthUrl() {
    return googleOAuth2Client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    });
}

export const validateCode = async code => {
    const res = await googleOAuth2Client.getToken(code);
    if (!res.tokens.id_token) throw createHttpError(401, 'Unauthorized');
    return await googleOAuth2Client.verifyIdToken({
        idToken: res.tokens.id_token,
    });
};
