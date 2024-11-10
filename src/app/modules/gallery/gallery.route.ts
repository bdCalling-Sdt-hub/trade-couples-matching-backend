import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { GalleryController } from './gallery.controller';
const router = express.Router();

router.post(
  '/upload-picture',
  auth(USER_ROLES.USER),
  fileUploadHandler(),
  GalleryController.uploadPicture
);

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.USER),
    fileUploadHandler(),
    GalleryController.updateUploadPicture
  )
  .delete(auth(USER_ROLES.USER), GalleryController.deleteUploadPicture);

router.get('/', auth(USER_ROLES.USER), GalleryController.getAllGalleryImages);

export const GalleryRoutes = router;
