import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get(
  '/profile',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getUserProfile
);

router.post(
  '/sign-up',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.patch(
  '/profile-update',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = UserValidation.updateUserZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return UserController.updateProfile(req, res, next);
  }
);

//admin
router.post(
  '/create-admin',
  auth(USER_ROLES.SUPER_ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

router.get(
  '/all-admin',
  auth(USER_ROLES.SUPER_ADMIN),
  UserController.getAllAdmin
);

//users getting api
router.get(
  '/all-user',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  UserController.getAllUser
);

//users getting api
router.get(
  '/user-details/:id',
  auth(USER_ROLES.USER),
  UserController.userInfo
);


router
  .route('/:id')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    UserController.getSingleUser
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN), UserController.userStatusAction);

export const UserRoutes = router;
