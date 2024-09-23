import moment from 'moment-timezone';
import {
    createWaterRecord,
    updateWaterRecordById,
    deleteWaterRecordById,
    findWaterRecordById,
    findDailyWaterRecords,
    findMonthlyWaterRecords,
    findUserById,
    getWaterRecordById,
    getWaterRecordsByUserAndDate,
} from '../services/water.js';
import errorHandler from '../middlewares/errorHandler.js';
import { format, startOfDay, endOfDay } from 'date-fns';
import User from '../db/models/user.js';

export const addWaterRecord = async (req, res, next) => {
    const { amount, date } = req.body;
    const owner = req.user.id;

    let recordDate = date ? new Date(date) : new Date();
    const userTimezone = req.headers['timezone'] || 'UTC';
    recordDate = format(recordDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
        timeZone: userTimezone,
    });

    const record = { amount, date: recordDate, owner };

    try {
        const newWaterRecord = await createWaterRecord(record);
        res.status(201).send({
            newWaterRecord,
            message: 'Water record successfully added',
        });
    } catch (err) {
        next(err);
    }
};

export const updateWaterRecord = async (req, res, next) => {
    const { id } = req.params;
    const { amount, date } = req.body;
    const userTimezone = req.headers['timezone'] || 'UTC';
    let recordDate = date ? new Date(date) : new Date();

    recordDate = format(recordDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
        timeZone: userTimezone,
    });

    const updatedData = { amount, date: recordDate };

    try {
        const updatedRecord = await updateWaterRecordById(id, updatedData);
        if (!updatedRecord) throw errorHandler(404, 'Water record not found');

        res.json({
            updatedRecord,
            message: 'Water record successfully updated',
        });
    } catch (err) {
        next(err);
    }
};

export const deleteWaterRecord = async (req, res, next) => {
    const { id } = req.params;

    try {
        const record = await findWaterRecordById(id);
        if (!record) return next(errorHandler(404));

        if (record.owner.toString() !== req.user.id)
            return next(errorHandler(403, 'Access denied'));

        const deletedRecord = await deleteWaterRecordById(id);
        res.status(200).send({
            deletedRecord,
            message: 'Water record successfully deleted',
        });
    } catch (err) {
        next(err);
    }
};

export const getDailyWaterRecord = async (req, res, next) => {
    const { date } = req.params;
    const dateObject = new Date(date);

    try {
        const records = await findDailyWaterRecords(req.user._id, dateObject);
        const totalAmountForDay = records
            .reduce((acc, record) => acc + record.amount, 0)
            .toFixed(2);
        const percentComplete = Math.floor(
            (totalAmountForDay / req.user.recommendedWater) * 100,
        );

        res.json({
            totalAmountForDay,
            percentComplete: percentComplete >= 100 ? 100 : percentComplete,
            records,
        });
    } catch (err) {
        next(err);
    }
};

export const getMonthlyWaterRecord = async (req, res, next) => {
    const { id, year, month } = req.params;
    const userId = id;

    try {
        const user = await findUserById(userId);
        if (!user) return next(errorHandler(404, 'User not found'));

        const userTimezone = req.headers['timezone'] || 'UTC';
        const startOfMonth = moment
            .tz({ year, month: month - 1, day: 1 }, userTimezone)
            .startOf('day');
        const endOfMonth = moment
            .tz({ year, month: month - 1 }, userTimezone)
            .endOf('month')
            .endOf('day');

        const waterRecords = await findMonthlyWaterRecords(
            userId,
            startOfMonth.toDate(),
            endOfMonth.toDate(),
        );

        const groupedByDay = waterRecords.reduce((acc, record) => {
            const localDate = moment
                .tz(record.date, userTimezone)
                .format('YYYY-MM-DD');
            acc[localDate] = acc[localDate] || 0;
            acc[localDate] += record.amount;
            return acc;
        }, {});

        const daysInMonth = Array.from(
            { length: endOfMonth.date() },
            (_, day) => {
                const formattedDate = moment
                    .tz({ year, month: month - 1, day: day + 1 }, userTimezone)
                    .format('YYYY-MM-DD');
                const totalAmount = groupedByDay[formattedDate] || 0;
                const percentComplete = (
                    (totalAmount / user.dailyWaterNorm) *
                    100
                ).toFixed(2);
                return {
                    day: formattedDate,
                    totalAmount: totalAmount.toFixed(2),
                    percentComplete,
                };
            },
        );

        const totalWaterForMonth = waterRecords
            .reduce((sum, record) => sum + record.amount, 0)
            .toFixed(2);

        res.status(200).send({ totalWaterForMonth, daysInMonth });
    } catch (err) {
        next(err);
    }
};

export const getWaterRecordByIdController = async (req, res, next) => {
    const { id } = req.params;
    const { date } = req.query;

    const dateObject = date ? new Date(date) : new Date();

    try {
        const records = await getWaterRecordById(id, dateObject);
        if (!records.length) {
            return next(errorHandler(404, 'Records not found for this day'));
        }

        const totalAmountForDay = records
            .reduce((acc, record) => acc + record.amount, 0)
            .toFixed(2);

        res.json({
            totalAmountForDay,
            records,
        });
    } catch (err) {
        next(err);
    }
};

export const getWaterRecordsByDay = async (req, res, next) => {
    const { id, date } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        const records = await getWaterRecordsByUserAndDate(id, date);

        const totalAmountForDay = records
            .reduce((acc, record) => acc + record.amount, 0)
            .toFixed(2);

        res.status(200).json({
            totalAmountForDay,
            records,
        });
    } catch (err) {
        next(err);
    }
};
