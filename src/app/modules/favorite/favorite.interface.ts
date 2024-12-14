import { Model, Types } from 'mongoose';

export type IFavorite = {
  userId: Types.ObjectId;
  favoriteUserId: Types.ObjectId;
};

export type FavoriteModel = {
  isExistOnFavoriteList(user: string, favoriteUserId: string): any;
} & Model<IFavorite>;
