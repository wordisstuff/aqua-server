import * as fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';

import { OAuth2Client } from 'google-auth-library';
// import { JSON_PATH } from '../constants/constants.js';
import { OAuth } from '../constants/index.js';
// const CONFIG = JSON.parse(
//     fs.readFileSync(path.resolve(JSON_PATH), { encoding: 'utf-8' }),
// );
const CONFIG = JSON.parse(
    fs.readFileSync(path.resolve('src', 'google-oauth.json'), {
        encoding: 'utf-8',
    }),
);

const googleOAuth2Client = new OAuth2Client({
    clientId: OAuth.clientId,
    clientSecret: OAuth.clientSecret,
    redirectUri: CONFIG['web']['redirect_uris'][0],
});

export function generateAuthUrl() {
    return googleOAuth2Client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    });
}

export async function validateCode(code) {
    try {
        const response = await googleOAuth2Client.getToken(code);
        return googleOAuth2Client.verifyIdToken({
            idToken: response.tokens.id_token,
        });
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 499
        ) {
            throw createHttpError(401, 'Unauthorized');
        } else {
            throw error;
        }
    }
}
