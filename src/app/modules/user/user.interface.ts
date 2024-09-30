import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

// export type TUserAddress = {
//     house: string;
//     road: string;
//     area: string;
//     policeStation: string;
//     district: string;
//     division: string;
// }
export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(name: string, email: string): boolean;
  isUserExistByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
