import { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  name: string;
  role: USER_ROLES;
  contact?: string;
  email: string;
  password: string;
  image?: string;
  address: string;
  gender: 'Male' | 'Female';
  status: 'ACTIVE' | 'DELETE' | "BLOCK";
  verified: boolean;
  isAnswered: boolean;
  isBio: boolean;
  isSubscribed: boolean;
  trialEndDate: Date;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
  userStatusSwitcher(id: string): any;
} & Model<IUser>;
