import { model, Schema } from 'mongoose';
export const serializeUser = ({
    name,
    email,
    gender,
    photo,
    weight,
    activeTime,
    recommendedWater,
    verifyByEmail,
}) => ({
    name,
    email,
    gender,
    photo,
    weight,
    activeTime,
    recommendedWater,
    verifyByEmail,
});

const userSchema = new Schema(
    {
        name: { type: String, default: 'User' },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        gender: { type: String, enum: ['female', 'male'], default: 'female' },
        photo: { type: String, default: null },
        weight: { type: Number, default: '' },
        activeTime: { type: Number, default: '' },
        recommendedWater: { type: Number, default: 1.5 },
        verifyByEmail: { type: Boolean, default: false },
        token: { type: String, default: null },
        verifyToken: { type: String, default: null },
    },
    { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = model('users', userSchema);
export default User;
