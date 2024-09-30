import { model, Schema } from 'mongoose';
import { TUser,  UserModel } from './user.interface';
import config from '../../config';
import bcrypt from "bcrypt";



// Define TUser schema
const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true
}
);

userSchema.pre('save', async function (next) {
  const userInfo = this;
  userInfo.password = await bcrypt.hash(
    userInfo.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

userSchema.statics.isUserExist = async function (name: string, email: string) {
  return await User.findOne({ name, email });
};

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimestamp;
};



// Export the model
export const User = model<TUser, UserModel>('User', userSchema);
