import { Model } from 'mongoose';

export type ISubscriber = {
  name: string;
  email: string;
  country?: string;
  status: 'PENDING' | 'REPLIED';
};

export type SubscriberModel = Model<ISubscriber, Record<string, unknown>>;
