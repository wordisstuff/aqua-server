import { createWater } from '../services/water.js';
import { format } from 'date-fns';

const timeZoneCreater = (date, zone) => {
    if (date) {
        return new Date(date);
    } else {
        const timeZone = zone || 'UTC';
        return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
            timeZone,
        });
    }
};
export const createWaterController = async (req, res) => {
    console.log(req.body);
    const date = timeZoneCreater(req.body.date, req.headers['timezone']);
    console.log('DATE', date);
    const aqua = await createWater({
        amount: req.body.amount,
        date,
        userId: req.user._id,
    });
    console.log('AQUA', aqua);
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
