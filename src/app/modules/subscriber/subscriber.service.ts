import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ISubscriber } from './subscriber.interface';
import { Subscriber } from './subscriber.model';

const createSubscriberToDB = async (
  payload: ISubscriber
): Promise<ISubscriber> => {
  const createSubscriber = await Subscriber.create(payload);
  if (!createSubscriber) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to submit your information, please try again'
    );
  }

  return createSubscriber;
};

const getSubscriberListFromDB = async (): Promise<ISubscriber[]> => {
  const result = await Subscriber.find();
  return result;
};

export const SubscriberService = {
  createSubscriberToDB,
  getSubscriberListFromDB,
};
