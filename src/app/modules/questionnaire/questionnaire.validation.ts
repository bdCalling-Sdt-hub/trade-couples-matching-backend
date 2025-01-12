import { z } from 'zod';

const createQuestionnaireZodSchema = z.object({
  body: z.object({
    liveAlone: z.string({ required_error: 'Live alone answer is required' }),
    liveWithParents: z.string().optional(),
    christian: z.string({
      required_error: 'are you christian answer is required',
    }),
    believeJesusIsHead: z.string({
      required_error: 'Jesus is Head answer is required',
    }),
    numberOfChildrenWanted: z.string().optional(),
    manIsMainProvider: z.string({
      required_error: 'Man is provider answer is required',
    }),
    menRoleModelsForBoys: z.string({
      required_error: 'Men is role model for boys answer is required',
    }),
    menSetStandardForDaughters: z.string({
      required_error: 'Men standard for the daughter answer is required',
    }),
    interestsHobbies: z.string({
      required_error: 'Interest hobbies is required',
    }),
    preferredAgeRange: z.string({
      required_error: 'Preferred age range is required',
    }),
    preferredEthnicity: z.string({
      required_error: 'Preferred ethnicity is required',
    }),
    preferredPhysique: z.string({
      required_error: 'Preferred physique is required',
    }),
    preferredFitnessLevel: z.string({
      required_error: 'Preferred fitness level is required',
    }),

    haveAHome: z.string().optional(),
    stepUpAsFather: z.string().optional(),
    stepUpAsMother: z.string().optional(),
    mothersAreNurturers: z.string().optional(),
    womenMakeHome: z.string().optional(),
    willingToWork: z.string().optional(),
    preferHomesteadingOrUrban: z.string().optional(),
  }),
});

const updateQuestionnaireZodSchema = z.object({
  body: z.object({
    liveAlone: z.string().optional(),
    liveWithParents: z.string().optional(),
    christian: z.string().optional(),
    believeJesusIsHead: z.boolean().optional(),
    numberOfChildrenWanted: z.string().optional(),
    manIsMainProvider: z.string().optional(),
    menRoleModelsForBoys: z.string().optional(),
    menSetStandardForDaughters: z.string().optional(),
    interestsHobbies: z.string().optional(),
    preferredAgeRange: z.string().optional(),
    preferredEthnicity: z.string().optional(),
    preferredPhysique: z.string().optional(),
    preferredFitnessLevel: z.string().optional(),
    haveAHome: z.string().optional(),
    stepUpAsFather: z.string().optional(),
    stepUpAsMother: z.string().optional(),
    mothersAreNurturers: z.string().optional(),
    womenMakeHome: z.string().optional(),
    willingToWork: z.string().optional(),
    preferHomesteadingOrUrban: z.string().optional(),
  }),
});

export const QuestionnaireValidation = {
  createQuestionnaireZodSchema,
  updateQuestionnaireZodSchema,
};
