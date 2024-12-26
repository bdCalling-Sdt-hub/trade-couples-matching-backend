import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ViewMeService } from './viewMe.service';

const makeViewMe = catchAsync(async (req: Request, res: Response) => {

  const user = req.user.id;
  const view = req.body.view;

  const result = await ViewMeService.makeViewMeToDB(user, view);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result as string,
  });
});

const getViewMeList = catchAsync(async (req: Request, res: Response) => {
  const userid = req.user.id;
  const result = await ViewMeService.getViewMeListFromDB(userid);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'View Me list retrieved successfully',
    data: result,
  });
});

export const ViewMeController = {
  makeViewMe,
  getViewMeList,
};
