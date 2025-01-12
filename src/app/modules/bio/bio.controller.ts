import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BioService } from './bio.service';

const createUserBio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user.id;
    const values = {
      user,
      ...req.body,
    };
    const result = await BioService.createUserBioToDB(values);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Your bio data has been added successfully.',
      data: result,
    });
  }
);

const getUserBio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user.id;
    const result = await BioService.getUserBioToDB(user);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Your bio data retrieved successfully.',
      data: result,
    });
  }
);

const updateUserBio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user.id;
    const { ...bioData } = req.body;
    const result = await BioService.updateUserBioToDB(user, bioData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Your bio data updated successfully.',
      data: result,
    });
  }
);

const findPeople = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BioService.findPeopleFromDB(req.user, req.query);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'People Retrieved successfully.',
      data: result,
    });
  }
);

const discoverPeople = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BioService.discoverPeopleFromDB(req.user, req.query);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'People Retrieved successfully.',
      data: result,
    });
  }
);

export const BioController = {
  createUserBio,
  getUserBio,
  updateUserBio,
  findPeople,
  discoverPeople
};
