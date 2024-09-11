import express from 'express';
import path from 'node:path';

export const pinoSettings = {
    transport: {
        target: 'pino-pretty',
    },
};

export const jsonParser = express.json();
export const serverDeployLink = 'https://aqua-server-83k1.onrender.com';

export const schemaObjectString = { type: String, required: true };

export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');
export const UPLOAD_DIR = path.resolve('src', 'uploads');
export const JSON_PATH = path.join(process.cwd(), 'google-oauth.json');
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
