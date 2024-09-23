import { updateUser } from '../services/user.js';

//update user code
export const updateUserController = async (req, res) => {
    const { _id } = req.user;
    const user = await updateUser(_id, req.body);
    console.log(user);
};
