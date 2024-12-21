import { z } from 'zod';

const subscriberCreateZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    email: z.string({ required_error: 'Email is required.' }).email(),
    country: z.string().optional(),
  }),
});

const subscriberRepliedMessage = z.object({
  body: z.object({
    description: z.string({ required_error: 'Description is required' }),
  }),
});

export const SubscriberValidation = {
  subscriberCreateZodSchema,
  subscriberRepliedMessage,
};
