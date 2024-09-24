import { updateUser } from '../services/user.js';

//update user code
export const updateUserController = async (req, res) => {
    const { _id } = req.user;
    const photo = req.file;
    console.log(photo);
    console.log('!@@!!', req.body);
    const user = await updateUser(_id, req.body);
    console.log(user);
    res.status(200).json({
        message: 'HELo!',
    });
};
