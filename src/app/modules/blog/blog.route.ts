import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
const router = express.Router();

router.post(
  '/create-blog',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.data) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Missing data field detected. Please fill in all required fields before proceeding.'
      );
    }
    req.body = BlogValidation.createBlogZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return BlogController.createBlog(req, res, next);
  }
);

router
  .route('/:id')
  .get(BlogController.getSingleBlog)
  .patch(
    auth(USER_ROLES.ADMIN),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = BlogValidation.createBlogZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return BlogController.updateBlog(req, res, next);
    }
  )
  .delete(BlogController.deleteBlog);

router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
