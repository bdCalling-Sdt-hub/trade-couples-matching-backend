import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Favorite } from './favorite.model';

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

export const FavoriteService = {
  makeFavoriteToDB,
};
