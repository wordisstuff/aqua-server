import { Schema, model } from 'mongoose';

const aquaSchema = new Schema(
    {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

const Water = model('water', aquaSchema);

export default Water;
