export const createWaterController = async (req,res) =>{
const aqua = await createWater(req.body);
res.status(201).json({
    status:201,
    message: 'Water was created!',
    data:aqua
})
};