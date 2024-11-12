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
    const result = await ResourcesService.createAffiliateProgramToDB({
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
  const result = await ResourcesService.getAffiliateProgramFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Affiliate data retrieved successfully',
    data: result,
  });
});

const updateAffiliateProgram = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ResourcesService.updateAffiliateProgramToDB({
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
  const result = await ResourcesService.createSupportToDB({
    type: RESOURCES_TYPE.SUPPORT,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Support data created successfully',
    data: result,
  });
});

const getSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getSupportFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Support data retrieved successfully',
    data: result,
  });
});

const updateSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updateSupportToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Support data updated successfully',
    data: result,
  });
});

//terms
const createTerms = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createTermsToDB({
    type: RESOURCES_TYPE.TERMS,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Terms data created successfully',
    data: result,
  });
});

const getTerms = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getTermsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Terms data retrieved successfully',
    data: result,
  });
});

const updateTerms = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updateTermsToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Terms data updated successfully',
    data: result,
  });
});

//policy
const createPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createPolicyToDB({
    type: RESOURCES_TYPE.POLICY,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Policy data created successfully',
    data: result,
  });
});

const getPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getPolicyFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Policy data retrieved successfully',
    data: result,
  });
});

const updatePolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updatePolicyToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Policy data updated successfully',
    data: result,
  });
});

//about
const createAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createAboutToDB({
    type: RESOURCES_TYPE.ABOUT,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About data created successfully',
    data: result,
  });
});

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getAboutFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About data retrieved successfully',
    data: result,
  });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updateAboutToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About data updated successfully',
    data: result,
  });
});

//safety
const createSafetyData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createSafetyDataToDB({
    type: RESOURCES_TYPE.SAFETY,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Safety data created successfully',
    data: result,
  });
});

const getSafetyData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getSafetyDataFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Safety data retrieved successfully',
    data: result,
  });
});

const updateSafetyData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updateSafetyDataToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Safety data updated successfully',
    data: result,
  });
});

//cookie
const createCookieData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.createCookieDataToDB({
    type: RESOURCES_TYPE.COOKIE,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Cookie data created successfully',
    data: result,
  });
});

const getCookieData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.getCookieDataFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Cookie data retrieved successfully',
    data: result,
  });
});

const updateCookieData = catchAsync(async (req: Request, res: Response) => {
  const result = await ResourcesService.updateCookieDataToDB({
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Cookie data updated successfully',
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
