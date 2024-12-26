import { z } from 'zod';

const createViewMeZodSchema = z.object({
  body: z.object({
    view: z.string({ required_error: 'View user  is required' }),
  }),
});

export const ViewMeValidation = {
  createViewMeZodSchema,
};
