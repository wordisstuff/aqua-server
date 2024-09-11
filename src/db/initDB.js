import mongoose from 'mongoose';
import { authDb } from '../constants/index.js';

export const initMongoDB = async () => {
    try {
        const { user, pwd, url, db } = authDb;

        await mongoose.connect(
            `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};
