import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FavoriteController } from './favorite.controller';
import { FavoriteValidation } from './favorite.validation';
const router = express.Router();

router.post(
  '/make-favorite',
  auth(USER_ROLES.USER),
  validateRequest(FavoriteValidation.createFavoriteZodSchema),
  FavoriteController.makeFavorite
);

export const FavoriteRoutes = router;
