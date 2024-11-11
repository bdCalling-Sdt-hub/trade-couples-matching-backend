import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RESOURCES_TYPE from '../../../enums/resources';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ResourcesService } from './resources.service';

//press
const createPress = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getPress = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updatePress = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

//affiliate
const createAffiliateProgram = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ResourcesService.createPressToDB({
      type: RESOURCES_TYPE.AFFILIATE,
      ...req.body,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Affiliate data created successfully',
      data: result,
    });
  }
);

const getAffiliateProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Affiliate data retrieved successfully',
    data: result,
  });
});

const updateAffiliateProgram = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ResourcesService.updatePressToDB({
      ...req.body,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Affiliate data updated successfully',
      data: result,
    });
  }
);

//support
const createSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updateSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

//terms
const createTerms = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getTerms = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updateTerms = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

//policy
const createPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updatePolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

//about
const createAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

//safety
const createSafetyData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getSafetyData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updateSafetyData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

//press
const createCookieData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPressToDB({
    type: RESOURCES_TYPE.PRESS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data created successfully',
    data: result,
  });
});

const getCookieData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPressFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data retrieved successfully',
    data: result,
  });
});

const updateCookieData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePressToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Press data updated successfully',
    data: result,
  });
});

export const ResourcesController = {
  createPress,
  updatePress,
  getPress,
  createAffiliateProgram,
  updateAffiliateProgram,
  getAffiliateProgram,
  createSupport,
  getSupport,
  updateSupport,
  createTerms,
  getTerms,
  updateTerms,
  createPolicy,
  getPolicy,
  updatePolicy,
  createAbout,
  getAbout,
  updateAbout,
  createSafetyData,
  getSafetyData,
  updateSafetyData,
  createCookieData,
  getCookieData,
  updateCookieData,
};
