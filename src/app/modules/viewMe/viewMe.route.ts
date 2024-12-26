import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ViewMeValidation } from './viewMe.validation';
import { ViewMeController } from './viewMe.controller';
const router = express.Router();

router.route("/")
  .post(
    auth(USER_ROLES.USER),
    validateRequest(ViewMeValidation.createViewMeZodSchema),
    ViewMeController.makeViewMe
  )
  .get(
    auth(USER_ROLES.USER), 
    ViewMeController.getViewMeList
  );

export const ViewMeRoutes = router;
