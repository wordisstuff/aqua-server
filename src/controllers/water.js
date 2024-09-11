import { createWater } from '../services/water.js';

export const createWaterController = async (req, res) => {
    console.log(req.user);
    console.log('BODY', req.body);
    const { _id } = req.user;
    const aqua = await createWater({
        ...req.body,
        userId: _id,
    });
    res.status(201).json({
        status: 201,
        message: 'Water was created!',
        data: aqua,
    });
};

// get water by id code

// update water code

// delete water code

// get water date codes
// day code

// week code

// month code
