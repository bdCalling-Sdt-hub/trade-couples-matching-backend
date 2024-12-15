import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FavoriteService } from './favorite.service';

const makeFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const favoriteUserId = req.body.favoriteUserId;

  const result = await FavoriteService.makeFavoriteToDB(userId, favoriteUserId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result as string,
  });
});

const getFavoriteList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await FavoriteService.getFavoriteListFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Favorite list retrieved successfully',
    data: result,
  });
});

export const FavoriteController = {
  makeFavorite,
  getFavoriteList,
};
