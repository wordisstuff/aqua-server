import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, default:"User"},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: {type: String, enum:['female','male'],default: 'female'},
    photo: {type: String,default:null},
    
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
