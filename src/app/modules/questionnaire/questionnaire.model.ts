import { model, Schema } from 'mongoose';
import { IQuestions } from './questionnaire.interface';

const questionnaireSchema = new Schema<IQuestions>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    liveAlone: { type: String, required: true },
    liveWithParents: { type: String},
    christian: { type: String, required: true },
    believeJesusIsHead: { type: String, required: true },
    numberOfChildrenWanted: { type: String },
    manIsMainProvider: { type: String, required: true },
    menRoleModelsForBoys: { type: String, required: true },
    menSetStandardForDaughters: { type: String, required: true },
    interestsHobbies: { type: String, required: true },
    preferredAgeRange: { type: String, required: true },
    preferredEthnicity: { type: String, required: true },
    preferredPhysique: { type: String, required: true },
    preferredFitnessLevel: { type: String, required: true },

    haveAHome: { type: String },
    stepUpAsFather: { type: String },
    stepUpAsMother: { type: String },
    mothersAreNurturers: { type: Boolean },
    womenMakeHome: { type: String },
    willingToWork: { type: String },
    preferHomesteadingOrUrban: { type: String },
  },
  { timestamps: true }
);

export const Questionnaire = model<IQuestions>(
  'Questionnaire',
  questionnaireSchema
);
