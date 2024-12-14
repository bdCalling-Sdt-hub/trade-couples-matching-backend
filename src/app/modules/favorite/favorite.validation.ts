import { z } from 'zod';

const createFavoriteZodSchema = z.object({
  body: z.object({
    favoriteUserId: z.string({ required_error: 'Favorite user  is required' }),
  }),
});

export const FavoriteValidation = {
  createFavoriteZodSchema,
};
