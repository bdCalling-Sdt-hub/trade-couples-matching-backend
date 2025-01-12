import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { GalleryService } from './gallery.service';

const uploadPicture = catchAsync(async (req: Request, res: Response) => {
  const result = await GalleryService.uploadPictureToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Photo has been uploaded to the gallery',
    data: result,
  });
});

const getAllGalleryImages = catchAsync(async (req: Request, res: Response) => {
  const user = req.user.id;
  const result = await GalleryService.getAllGalleryImagesFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Photo has been retrieve from the gallery',
    data: result,
  });
});

const updateUploadPicture = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const image = getSingleFilePath(req.files, 'image');
  const data = {
    image,
  };

  const result = await GalleryService.updateUploadPictureToDB(id, data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Photo has been updated to the gallery',
    data: result,
  });
});

const deleteUploadPicture = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const result = await GalleryService.deleteUploadPictureToDB(id, user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Photo has been deleted from the gallery',
    data: result,
  });
});

export const GalleryController = {
  uploadPicture,
  updateUploadPicture,
  getAllGalleryImages,
  deleteUploadPicture,
};
