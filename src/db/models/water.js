import { Schema, model } from 'mongoose';

const aquaSchema = new Schema(
    {
        date: { type: String, required: true },
        norm: { type: Number, required: true },
        amount: { type: Number, required: true },
        percent: { type: Number },
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

const Water = model('water', aquaSchema);

export default Water;
