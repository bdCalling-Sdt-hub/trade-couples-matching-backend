import express, { NextFunction, Request, Response } from "express";
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { GalleryController } from './gallery.controller';
import { getMultipleFilesPath } from "../../../shared/getFilePath";
const router = express.Router();

router.post(
  '/upload-picture',
  auth(USER_ROLES.USER),
  fileUploadHandler(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const images = getMultipleFilesPath(req.files, 'image');
      if (Array.isArray(images)) {
        req.body = images?.map((image: string) => {
          return {
            user: req.user.id,
            image
          }
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Need Array to insert Multiple Photos together" });
    }
  },
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
