import User from '../db/models/user.js';

//update user code
export const updateUser = async (id, body) => {
    return await User.findOneAndUpdate({ _id: id }, body, { new: true });
};
