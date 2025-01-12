import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IGallery } from './gallery.interface';
import { Gallery } from './gallery.model';

const uploadPictureToDB = async (payload: IGallery) => {

  const total = await Gallery.countDocuments({ user: payload.user });
  if (total >= 6) {
    //unlink file
    unlinkFile(payload.image!);

    //throw error
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Upload limit reached: Each user can only have a maximum of 6 pictures'
    );
  }
  const uploadPic = await Gallery.create(payload);
  if (!uploadPic) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to upload picture');
  }
  return uploadPic;
};

const getAllGalleryImagesFromDB = async (id: string) => {
  const isExistPictures = await Gallery.find({ user: id }).select("image").lean();
  if (!isExistPictures) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'No pictures found for this user'
    );
  }
  return isExistPictures;
};

const updateUploadPictureToDB = async (
  id: string,
  payload: Partial<IGallery>
) => {
  const isExistPic = await Gallery.findById(id);
  if (!isExistPic) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Picture doesn't exist!");
  }

  //unlink file
  if (payload.image) {
    unlinkFile(isExistPic.image!);
  }

  //delete user
  delete payload.user;

  const updateData = await Gallery.findOneAndUpdate(
    { _id: isExistPic._id },
    payload,
    { new: true }
  );
  return updateData;
};

const deleteUploadPictureToDB = async (id: string, user: JwtPayload) => {
  const isExistPic = await Gallery.findById(id);
  if (!isExistPic) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Picture doesn't exist!");
  }
  if (isExistPic.user.toString() !== user.id) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'You have no permission to delete this picture!'
    );
  }

  //unlink file
  unlinkFile(isExistPic.image!);

  const deleteData = await Gallery.findByIdAndDelete(isExistPic._id);
  return deleteData;
};

export const GalleryService = {
  uploadPictureToDB,
  updateUploadPictureToDB,
  getAllGalleryImagesFromDB,
  deleteUploadPictureToDB,
};
