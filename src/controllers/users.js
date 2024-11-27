import { getUsers } from "../services/users";


export const updateUserController = async (req, res) => {
   const users = getUsers();
//    const usersAvatarsArr = users.map(i=>{
    
//    })
    res.status(200).json({
        message: `Users accesfuly`,
        avatars: users,
    });
};
