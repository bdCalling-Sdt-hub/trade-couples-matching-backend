import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import { Bio } from '../bio/bio.model';
import { Gallery } from '../gallery/gallery.model';
import { Questionnaire } from '../questionnaire/questionnaire.model';

const createUserToDB = async (payload: Partial<IUser>) => {
  //set role
  payload.role = USER_ROLES.USER;
  const createUser = await User.create(payload);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }

  //send email
  const otp = generateOTP();
  const values = {
    name: createUser.name,
    otp: otp,
    email: createUser.email!,
  };
  const createAccountTemplate = emailTemplate.createAccount(values);
  emailHelper.sendEmail(createAccountTemplate);

  //save to DB
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 3 * 60000),
  };
  await User.findOneAndUpdate(
    { _id: createUser._id },
    { $set: { authentication } }
  );
};

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const excludeFields: Array<keyof IUser> = ['email', 'gender'];
  excludeFields.forEach(field => delete payload[field]);

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

//admin
const createAdminToDB = async (payload: Partial<IUser>) => {
  //set role
  payload.role = USER_ROLES.ADMIN;
  payload.verified = true;

  const createAdmin = await User.create(payload);
  if (!createAdmin) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
  }

  return createAdmin;
};

const getAllAdminFromDB = async () => {
  const isExistAdmin = await User.find({
    role: { $eq: USER_ROLES.ADMIN },
    status: { $ne: 'DELETE' },
  });
  if (!isExistAdmin) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Admin doesn't exist!");
  }

  return isExistAdmin;
};

const userStatusActionToDB = async (id: string) => {
  const deleteUser = await User.userStatusSwitcher(id);
  return deleteUser;
};

//user
const getAllUserFromDB = async () => {
  const isExistUser = await User.find({
    role: { $eq: USER_ROLES.USER },
    status: { $ne: 'DELETE' },
  });
  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User doesn't exist!");
  }

  return isExistUser;
};

const userInfoFromDB = async (id: string) => {

  if(!mongoose.Types.ObjectId.isValid(id)){
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid User ID")
  }

  const [user, bio, gallery, questionary] = await Promise.all([
    User.findById(id).select("name image address").lean(),
    Bio.findOne({user: id}),
    Gallery.find({user: id}),
    Questionnaire.find({user: id})
  ])

  
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User doesn't exist!");
  }

  const data = {
    ...user,
    gallery,
    bio,
    questionary
  }

  return data;
};


const getSingleUserFromDB = async (id: string) => {
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User doesn't exist!");
  }

  return isExistUser;
};



export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  createAdminToDB,
  getAllAdminFromDB,
  userStatusActionToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  userInfoFromDB
  
};
