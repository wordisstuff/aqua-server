import User from '../db/models/user.js';

export const getUsers = async () => {
    return await User.find();
};