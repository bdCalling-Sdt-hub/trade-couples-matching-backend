import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
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

const getSubscriberListFromDB = async (query: Record<string, any>): Promise<{ subscriber: [], meta: { page: 0, total: 0 } }> => {
  const { page, limit, search } = query;
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;


  const anyConditions = [];

  if (search) {
    anyConditions.push({
      $or: ["name", "email", "country"].map((field) => ({
        [field]: {
          $regex: search,
          $options: "i"
        }
      }))
    });
  }

  const whereConditions = anyConditions.length > 0 ? { $and: anyConditions } : {};

  const result = await Subscriber.find(whereConditions)
    .lean()
    .skip(skip)
    .limit(size);
  const count = await Subscriber.countDocuments(whereConditions)

  const data = {
    subscriber: result,
    meta: {
      page: pages,
      total: count
    }
  } as { subscriber: [], meta: { page: 0, total: 0 } }

  return data;
};

const subscriberRepliedMessageToDB = async (id: string, payload: string) => {
  const isExist = await Subscriber.findById(id);
  if (!isExist) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'User subscription information, not found!'
    );
  }

  //already replied
  if (isExist.status === 'REPLIED') {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You already replied to this user'
    );
  }
  const data = {
    name: isExist?.name,
    email: isExist?.email,
    description: payload,
  };
  const subscriberReplied = emailTemplate.subscriberReplied(data);
  emailHelper.sendEmail(subscriberReplied);

  //update status
  await Subscriber.findByIdAndUpdate(isExist._id, { status: 'REPLIED' });
};

export const SubscriberService = {
  createSubscriberToDB,
  getSubscriberListFromDB,
  subscriberRepliedMessageToDB,
};
