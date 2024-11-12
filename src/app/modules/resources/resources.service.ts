import { StatusCodes } from 'http-status-codes';
import RESOURCES_TYPE from '../../../enums/resources';
import ApiError from '../../../errors/ApiError';
import { IResources } from './resources.interface';
import { Resources } from './resources.model';

//press
const createPressToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getPressFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.PRESS });
  return result;
};

const updatePressToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.PRESS });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Press data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//affiliate
const createAffiliateProgramToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getAffiliateProgramFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.AFFILIATE });
  return result;
};

const updateAffiliateProgramToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.AFFILIATE });
  if (!isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Affiliate program data doesn't exist"
    );
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//support
const createSupportToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getSupportFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.SUPPORT });
  return result;
};

const updateSupportToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.SUPPORT });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Support data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//terms
const createTermsToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getTermsFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.TERMS });
  return result;
};

const updateTermsToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.TERMS });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Terms data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//policy
const createPolicyToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getPolicyFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.POLICY });
  return result;
};

const updatePolicyToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.POLICY });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Policy data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//about
const createAboutToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getAboutFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.ABOUT });
  return result;
};

const updateAboutToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.ABOUT });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "About data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//safety
const createSafetyDataToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getSafetyDataFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.SAFETY });
  return result;
};

const updateSafetyDataToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.SAFETY });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Safety data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

//cookie
const createCookieDataToDB = async (payload: IResources) => {
  const isExist = await Resources.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const result = await Resources.create(payload);
  return result;
};

const getCookieDataFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.COOKIE });
  return result;
};

const updateCookieDataToDB = async (payload: Partial<IResources>) => {
  const isExist = await Resources.findOne({ type: RESOURCES_TYPE.COOKIE });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Cookie data doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(isExist._id, payload, {
    new: true,
  });
  return updateData;
};

export const ResourcesService = {
  createPressToDB,
  updatePressToDB,
  getPressFromDB,
  createAffiliateProgramToDB,
  getAffiliateProgramFromDB,
  updateAffiliateProgramToDB,
  createSupportToDB,
  getSupportFromDB,
  updateSupportToDB,
  createTermsToDB,
  getTermsFromDB,
  updateTermsToDB,
  createPolicyToDB,
  getPolicyFromDB,
  updatePolicyToDB,
  createAboutToDB,
  getAboutFromDB,
  updateAboutToDB,
  createSafetyDataToDB,
  getSafetyDataFromDB,
  updateSafetyDataToDB,
  createCookieDataToDB,
  getCookieDataFromDB,
  updateCookieDataToDB,
};
