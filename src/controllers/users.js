import { getUsers } from '../services/users.js';

export const GetUsersController = async (req, res) => {
    const users = await getUsers();
    const usersAvatarsArr = users.map(i => i.photo);

    res.status(200).json({
        message: `Users accesfuly`,
        avatars: usersAvatarsArr,
    });
};
