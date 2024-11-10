import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IBio } from './bio.interface';
import { Bio } from './bio.model';

const createUserBioToDB = async (payload: IBio) => {
  const isExistBioForThatUser = await Bio.findById(payload.user);
  if (!isExistBioForThatUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You already add your bio');
  }

  const createBio = await Bio.create(payload);
  if (!createBio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user about');
  }

  //update user
  await User.findByIdAndUpdate(createBio.user, { isBio: true }, { new: true });

  return createBio;
};

const getUserBioToDB = async (id: string) => {
  const isExistBio = await Bio.findOne({ user: id }).select('-user');
  if (!isExistBio) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Bio data for this user does not exist.'
    );
  }
  return isExistBio;
};

const updateUserBioToDB = async (id: string, payload: Partial<IBio>) => {
  const isExistBio = await Bio.findOne({ user: id }).select('-user');
  if (!isExistBio) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Bio data for this user does not exist.'
    );
  }

  const updateData = await Bio.findByIdAndUpdate(isExistBio._id, payload, {
    new: true,
  });
  return updateData;
};

export const BioService = {
  createUserBioToDB,
  getUserBioToDB,
  updateUserBioToDB,
};
