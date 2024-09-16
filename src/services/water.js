import WaterRecord from '../db/models/water.js';
import User from '../db/models/user.js';

export const createWaterRecord = async record => {
    return await WaterRecord.create(record);
};

export const updateWaterRecordById = async (id, updatedData) => {
    return await WaterRecord.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteWaterRecordById = async id => {
    return await WaterRecord.findByIdAndDelete(id);
};

export const findWaterRecordById = async id => {
    return await WaterRecord.findById(id);
};

export const findDailyWaterRecords = async (
    userId,
    startOfDayDate,
    endOfDayDate,
) => {
    return await WaterRecord.find({
        owner: userId,
        date: { $gte: startOfDayDate, $lte: endOfDayDate },
    });
};

export const findMonthlyWaterRecords = async (
    userId,
    startOfMonth,
    endOfMonth,
) => {
    return await WaterRecord.find({
        owner: userId,
        date: { $gte: startOfMonth, $lte: endOfMonth },
    });
};

export const findUserById = async userId => {
    return await User.findById(userId);
};

export const getWaterRecordById = async (userId, date) => {
    const startOfDayDate = new Date(date.setHours(0, 0, 0, 0));
    const endOfDayDate = new Date(date.setHours(23, 59, 59, 999));

    const records = await WaterRecord.find({
        owner: userId, // використовуємо userId для пошуку
        date: { $gte: startOfDayDate, $lte: endOfDayDate },
    });

    return records;
};
