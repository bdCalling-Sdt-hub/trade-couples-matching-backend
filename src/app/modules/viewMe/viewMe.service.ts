import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ViewMe } from './viewMe.model';
import { IViewMe } from './viewMe.interface';
import mongoose from 'mongoose';
import { Favorite } from '../favorite/favorite.model';
import { Bio } from '../bio/bio.model';
import { JwtPayload } from 'jsonwebtoken';

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

const getViewMeListFromDB = async (user: JwtPayload): Promise<IViewMe[]> => {

  const result = await ViewMe.find({ user })
    .populate({
      path: 'view',
      select: 'name image',
    })
    .select("view")
    .lean();

  if(!result?.length){
    throw new ApiError(StatusCodes.BAD_REQUEST, "No data found")
  }

  const users: any[] = await Promise.all(result.map(async (item: any) => {
    const isBookedMark = await Favorite.findOne({ userId: user, favoriteUserId: item?.view?._id });
    const bio = await Bio.findOne({user: item?.view?._id}).select("age country").lean();
    return {
      ...item,
      ...bio,
      isFavorite: !!isBookedMark
    }
  }))

  return users;
};

export const ViewMeService = {
  makeViewMeToDB,
  getViewMeListFromDB,
};
