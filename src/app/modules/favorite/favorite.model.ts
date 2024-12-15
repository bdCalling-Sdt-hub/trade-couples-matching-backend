import { model, Schema } from 'mongoose';
import { FavoriteModel, IFavorite } from './favorite.interface';

const favoriteSchema = new Schema<IFavorite, FavoriteModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
      select: 0,
    },
    favoriteUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Ensure no duplicate favorites
favoriteSchema.index({ userId: 1, favoriteUserId: 1 }, { unique: true });

//check exist
favoriteSchema.statics.isExistOnFavoriteList = async (
  user: string,
  favoriteUserId: string
) => {
  const isExist = await Favorite.findOne({
    userId: user,
    favoriteUserId: favoriteUserId,
  });
  return !!isExist;
};

export const Favorite = model<IFavorite, FavoriteModel>(
  'Favorite',
  favoriteSchema
);
