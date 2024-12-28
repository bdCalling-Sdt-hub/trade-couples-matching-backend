import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBio = {
  user: Types.ObjectId | IUser;
  aboutMe?: string;
  age: string;
  dob: string;
  height: string;
  bodyShape: string;
  educationOn: string;
  educationFrom: string;
  ethnicity: string;
  country: string;
  region: string;
  hairColor: string;
  eyeColor: string;
  maritalStatus: string;
  children: string;
  howManyChildren?: number;
  childrenAges?: number[];
  searchingRightPartner: string;
  wantToLive: string;
  occupation: string;
};
