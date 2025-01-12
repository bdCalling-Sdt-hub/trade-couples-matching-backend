import z from 'zod';

const createAboutZodSchema = z.object({
  body: z.object({
    aboutMe: z.string().optional(),
    age: z.string({ required_error: 'Age is required' }),
    dob: z.string({ required_error: 'Date of birth is required' }),
    height: z.string({ required_error: 'Hight is required' }),
    bodyShape: z.string({ required_error: 'Body shape is required' }),
    educationOn: z.string({ required_error: 'Education is required' }),
    educationFrom: z.string({ required_error: 'Education date is required' }),
    ethnicity: z.string({ required_error: 'Ethnicity is required' }),
    country: z.string({ required_error: 'Country is required' }),
    region: z.string({ required_error: 'Region is required' }),
    hairColor: z.string({ required_error: 'Hair color is required' }),
    eyeColor: z.string({ required_error: 'Eye color is required' }),
    maritalStatus: z.string({ required_error: 'Marital status is required' }),
    children: z.string({ required_error: 'Children is required' }),
    howManyChildren: z.number().optional(),
    childrenAges: z.array(z.number()).optional(),
    searchingRightPartner: z.string({
      required_error: 'Willing searching right person answer is required',
    }),
    wantToLive: z.string({ required_error: 'Want to live is required' }),
    occupation: z.string({ required_error: 'Occupation is required' }),
  }),
});

const updateAboutZodSchema = z.object({
  body: z.object({
    aboutMe: z.string().optional(),
    age: z.string().optional(),
    dob: z.string().optional(),
    hight: z.string().optional(),
    bodyShape: z.string().optional(),
    educationOn: z.string().optional(),
    educationFrom: z.string().optional(),
    ethnicity: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    hairColor: z.string().optional(),
    eyeColor: z.string().optional(),
    maritalStatus: z.string().optional(),
    children: z.string().optional(),
    howManyChildren: z.number().optional(),
    childrenAges: z.array(z.number()).optional(),
    searchingRightPartner: z.boolean().optional(),
    wantToLive: z.boolean().optional(),
    occupation: z.string().optional(),
  }),
});

export const AboutValidation = {
  createAboutZodSchema,
  updateAboutZodSchema,
};
