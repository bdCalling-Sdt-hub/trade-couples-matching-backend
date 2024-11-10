import { z } from 'zod';

const createQuestionnaireZodSchema = z.object({
  body: z.object({
    liveAlone: z.boolean({ required_error: 'Live alone answer is required' }),
    liveWithParents: z.boolean({
      required_error: 'Live with parents answer is required',
    }),
    christian: z.boolean({
      required_error: 'are you christian answer is required',
    }),
    believeJesusIsHead: z.boolean({
      required_error: 'Jesus is Head answer is required',
    }),
    numberOfChildrenWanted: z.number({
      required_error: 'Number of children is required',
    }),
    manIsMainProvider: z.boolean({
      required_error: 'Man is provider answer is required',
    }),
    menRoleModelsForBoys: z.boolean({
      required_error: 'Men is role model for boys answer is required',
    }),
    menSetStandardForDaughters: z.boolean({
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

    haveAHome: z.boolean().optional(),
    stepUpAsFather: z.boolean().optional(),
    stepUpAsMother: z.boolean().optional(),
    mothersAreNurturers: z.boolean().optional(),
    womenMakeHome: z.boolean().optional(),
    willingToWork: z.boolean().optional(),
    preferHomesteadingOrUrban: z.string().optional(),
  }),
});

const updateQuestionnaireZodSchema = z.object({
  body: z.object({
    liveAlone: z.boolean().optional(),
    liveWithParents: z.boolean().optional(),
    christian: z.boolean().optional(),
    believeJesusIsHead: z.boolean().optional(),
    numberOfChildrenWanted: z.number().optional(),
    manIsMainProvider: z.boolean().optional(),
    menRoleModelsForBoys: z.boolean().optional(),
    menSetStandardForDaughters: z.boolean().optional(),
    interestsHobbies: z.string().optional(),
    preferredAgeRange: z.string().optional(),
    preferredEthnicity: z.string().optional(),
    preferredPhysique: z.string().optional(),
    preferredFitnessLevel: z.string().optional(),
    haveAHome: z.boolean().optional(),
    stepUpAsFather: z.boolean().optional(),
    stepUpAsMother: z.boolean().optional(),
    mothersAreNurturers: z.boolean().optional(),
    womenMakeHome: z.boolean().optional(),
    willingToWork: z.boolean().optional(),
    preferHomesteadingOrUrban: z.string().optional(),
  }),
});

export const QuestionnaireValidation = {
  createQuestionnaireZodSchema,
  updateQuestionnaireZodSchema,
};
