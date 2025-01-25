import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IFavorite } from './favorite.interface';
import { Favorite } from './favorite.model';
import { Bio } from '../bio/bio.model';

const makeFavoriteToDB = async (
  userId: string,
  favoriteUserId: string
): Promise<String> => {
  const isExist = await Favorite.isExistOnFavoriteList(userId, favoriteUserId);
  if (isExist) {
    await Favorite.findOneAndDelete({ userId, favoriteUserId });
    return 'User marked as unfavorite!';
  }

  const makeFavorite = await Favorite.create({ userId, favoriteUserId });
  if (!makeFavorite) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created favorite');
  }
  return 'User marked as favorite!';
};

const getFavoriteListFromDB = async (userId: string): Promise<IFavorite[]> => {


  const result = await Favorite.find({ userId }).populate({
    path: 'favoriteUserId',
    select: 'name image',
  }).select("-createdAt -updatedAt -__v").lean();


  const users: any[] = await Promise.all(result.map(async (item: any) => {
      const bio = await Bio.findOne({user: item?.favoriteUserId?._id}).select("age country").lean();
      return {
        ...item,
        ...bio,
        isFavorite: true
      }
    }))

  return users;
};

export const FavoriteService = {
  makeFavoriteToDB,
  getFavoriteListFromDB,
};
