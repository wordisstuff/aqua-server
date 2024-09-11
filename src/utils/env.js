import dotenv from 'dotenv';

dotenv.config();

export const env = (name, defName) => {
    if (process.env[name]) return process.env[name];
    if (defName) return defName;

    throw new Error(`Environment variable ${name} is not set`);
};
