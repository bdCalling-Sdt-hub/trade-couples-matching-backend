import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BioController } from './bio.controller';
import { AboutValidation } from './bio.validation';
const router = express.Router();

router.post(
  '/create-bio',
  auth(USER_ROLES.USER),
  validateRequest(AboutValidation.createAboutZodSchema),
  BioController.createUserBio
);

router
  .route('/')
  .get(auth(USER_ROLES.USER), BioController.getUserBio)
  .patch(
    auth(USER_ROLES.USER),
    validateRequest(AboutValidation.updateAboutZodSchema),
    BioController.updateUserBio
  );

export const BioRoutes = router;
``;
