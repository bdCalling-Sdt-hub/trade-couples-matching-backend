import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogToDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Blog');
  }
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const isExist = await Blog.findById(id);
  if (!isExist) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Blog post not found. Please check the ID and try again.'
    );
  }
  return isExist;
};

const updateBlogToDB = async (id: string, payload: Partial<IBlog>) => {
  const isExist = await Blog.findById(id);
  if (!isExist) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Blog post not found. Please check the ID and try again.'
    );
  }

  //unlink file
  if (payload.image) {
    unlinkFile(isExist.image);
  }
  const updateData = await Blog.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });

  return updateData;
};

const deleteBlogToDB = async (id: string) => {
  const isExist = await Blog.findById(id);
  if (!isExist) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Blog post not found. Please check the ID and try again.'
    );
  }
  //unlink file
  unlinkFile(isExist.image);

  const deleteBlog = await Blog.findByIdAndDelete(isExist._id);
  return deleteBlog;
};

export const BlogService = {
  createBlogToDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogToDB,
  deleteBlogToDB,
};
