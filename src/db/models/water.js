//import { Schema, model } from 'mongoose';

//const aquaSchema = new Schema(
//    {
//        date: { type: Date, required: true },
//        amount: { type: Number, required: true },
//        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
//    },
//    {
//        timestamps: false,
//        versionKey: false,
//    },
//);

//const Water = model('water', aquaSchema);

//export default Water;

import mongoose from 'mongoose';

const getCurrentDate = () => {
    const now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
    );
};

const waterRecordSchema = new mongoose.Schema(
    {
        amount: { type: Number, required: true },
        date: { type: Date, required: true, default: getCurrentDate },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { versionKey: false, timestamps: true },
);

export default mongoose.model('WaterRecord', waterRecordSchema);
