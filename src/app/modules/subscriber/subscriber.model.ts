import { model, Schema } from 'mongoose';
import { ISubscriber, SubscriberModel } from './subscriber.interface';

const subscriberSchema = new Schema<ISubscriber, SubscriberModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'REPLIED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

export const Subscriber = model<ISubscriber, SubscriberModel>(
  'Subscriber',
  subscriberSchema
);
