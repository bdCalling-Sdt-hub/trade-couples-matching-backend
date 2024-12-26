import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ViewMe } from './viewMe.model';
import { IViewMe } from './viewMe.interface';
import mongoose from 'mongoose';

const makeViewMeToDB = async (
  user: string,
  view: string
): Promise<String> => {

  if (!mongoose.Types.ObjectId.isValid(view)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid view id');
  }

  const isExist = await ViewMe.isExistOnViewMeList(user, view);
  if (isExist) {
    return 'User already marked as view';
  }

  const makeViewMe = await ViewMe.create({ user, view });
  if (!makeViewMe) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created View Me');
  }
  return 'User marked as view';

};

const getViewMeListFromDB = async (user: string): Promise<IViewMe[]> => {

  const result = await ViewMe.find({ user })
    .populate({
      path: 'user',
      select: 'name image',
    })
    .select("user");

  return result;
};

export const ViewMeService = {
  makeViewMeToDB,
  getViewMeListFromDB,
};
