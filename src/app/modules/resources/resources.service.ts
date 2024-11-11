import { StatusCodes } from 'http-status-codes';
import RESOURCES_TYPE from '../../../enums/resources';
import ApiError from '../../../errors/ApiError';
import { IResources } from './resources.interface';
import { Resources } from './resources.model';

//press
const createPressToDB = async (payload: IResources) => {
  const isExistPress = await Resources.findOne({ type: payload.type });
  if (isExistPress) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Press resource already exists! Please try updating it instead.'
    );
  }

  const createPress = await Resources.create(payload);
  return createPress;
};

const getPressFromDB = async () => {
  const result = await Resources.findOne({ type: RESOURCES_TYPE.PRESS });
  return result;
};

const updatePressToDB = async (payload: Partial<IResources>) => {
  const isExistPress = await Resources.findOne({ type: RESOURCES_TYPE.PRESS });
  if (!isExistPress) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Press doesn't exist");
  }

  //prevent type
  delete payload.type;

  const updateData = await Resources.findByIdAndUpdate(
    isExistPress._id,
    payload,
    { new: true }
  );
  return updateData;
};

export const ResourcesService = {
  createPressToDB,
  updatePressToDB,
  getPressFromDB,
};
