import { cloudApi } from '../constants/index.js';
import { serializeUser } from '../db/models/user.js';
import { updateUser } from '../services/user.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import saveFileToUploads from '../utils/saveFileToUploads.js';

//update user code
export const updateUserController = async (req, res) => {
    const { _id } = req.user;
    const photo = req.file;
    let photoUrl;
    if (photo) {
        if (cloudApi.enable === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploads(photo);
        }
    }
    const updatedUser = { ...req.body, photo: photoUrl };

    const user = await updateUser(_id, updatedUser);
    res.status(200).json({
        message: `User with email ${user.email} was updated!!!`,
        user: serializeUser(user),
    });
};
