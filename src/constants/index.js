import { env } from '../utils/env.js';
import { JSON_PATH } from './constants.js';

const VARS = {
    PORT: 'PORT',
    USER: 'MONGODB_USER',
    PASSWORD: 'MONGODB_PASSWORD',
    URL: 'MONGODB_URL',
    DB: 'MONGODB_DB',
};

export const authDb = {
    port: env(VARS.PORT, 3000),
    user: env(VARS.USER),
    pwd: env(VARS.PASSWORD),
    url: env(VARS.URL),
    db: env(VARS.DB),
};

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
};

export const FIFTEEN_MINUTES = 900000;
export const TWO_HOURS = 7200000;
export const ONE_DAY = 86400000;

const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};

export const smtp = {
    auth: {
        host: env(SMTP.SMTP_HOST),
        port: Number(env(SMTP.SMTP_PORT)),
        auth: {
            user: env(SMTP.SMTP_USER),
            pass: env(SMTP.SMTP_PASSWORD),
        },
    },
    jwtSecret: env('JWT_SECRET'),
    from: env(SMTP.SMTP_FROM),
};

export const tps = {
    domain: env('APP_DOMAIN'),
    global_dom: env('APP_GLOBAL_DOM'),
    global_server: env('APP_GLOBAL_SERVER'),
    togle: env('SERVER'),
};

const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
    ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};

export const cloudApi = {
    name: env(CLOUDINARY.CLOUD_NAME),
    key: env(CLOUDINARY.API_KEY),
    secret: env(CLOUDINARY.API_SECRET),
    enable: env(CLOUDINARY.ENABLE_CLOUDINARY),
};

const GOOGLE_AUTH = {
    CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
    CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
};

export const OAuth = {
    clientId: env(GOOGLE_AUTH.CLIENT_ID),
    clientSecret: env(GOOGLE_AUTH.CLIENT_SECRET),
    jsonPath: JSON_PATH,
};

export const redirectUrl =
    tps.togle === 'global' ? `${tps.global_dom}` : `${tps.domain}5173`;

export const serverUrl =
    tps.togle === 'global'
        ? `${tps.global_server}`
        : `${tps.domain}${authDb.port}`;
