import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    await UserService.createUserToDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:
        'Please check your email to verify your account. We have sent you an OTP to complete the registration process.',
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');
    const data = {
      image,
      ...req.body,
    };
    const result = await UserService.updateProfileToDB(user, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

//create admin
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createAdminToDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Admin profile created successfully',
      data: result,
    });
  }
);

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllAdminFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All admin data retrieved successfully',
    data: result,
  });
});

const userStatusAction = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.userStatusActionToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `${
      result?.role.charAt(0).toUpperCase() + result?.role.slice(1)
    } has been successfully ${result?.status}ed`,
    data: result,
  });
});

//users
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUserFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All user data retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single user data retrieved successfully',
    data: result,
  });
});

const userInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.userInfoFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single user data retrieved successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getUserProfile,
  updateProfile,
  createAdmin,
  getAllAdmin,
  userStatusAction,
  getSingleUser,
  getAllUser,
  userInfo
};
