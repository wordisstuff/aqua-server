// import { readFile } from 'node:fs/promises';
import createHttpError from 'http-errors';
import { OAuth2Client } from 'google-auth-library';
import { OAuth, redirectUrl } from '../constants/index.js';

// const oauthConfig = JSON.parse(await readFile(OAuth.jsonPath));

const googleOAuth2Client = new OAuth2Client({
    clientId: OAuth.clientId,
    clientSecret: OAuth.clientSecret,
    redirectUri: `${redirectUrl}/auth/google`,
});
console.log(OAuth);
console.log(redirectUrl);

export function generateAuthUrl() {
    return googleOAuth2Client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    });
}

export async function validateCode(code) {
    console.log('CODE', code);
    try {
        const response = await googleOAuth2Client.getToken(code);
        console.log('RESPONS ', response);
        return googleOAuth2Client.verifyIdToken({
            idToken: response.tokens.id_token,
            audience: OAuth.clientId,
        });
    } catch (error) {
        console.log('ERROR validateCode', error);
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
