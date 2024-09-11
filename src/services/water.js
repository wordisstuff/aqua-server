import Water from '../db/models/water.js';

export const createWater = async aqua => {
    console.log('Aqua', aqua);

    const percent = Number((aqua.amount / (aqua.norm * 1000)) * 100).toFixed(2);

    const water = await Water.create({ ...aqua, percent });
    return water;
};

// get water by id code

// update water code

// delete water code

// get water date codes
// day code

// week code

// month code
