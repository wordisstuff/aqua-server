import { getUsers } from "../services/users";


export const GetUsersController = async (req, res) => {
   const users = await getUsers();
//    const usersAvatarsArr = users.map(i=>{
    
//    })
    res.status(200).json({
        message: `Users accesfuly`,
        avatars: users,
    });
};
