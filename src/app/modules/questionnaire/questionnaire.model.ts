import { model, Schema } from 'mongoose';
import { IQuestions } from './questionnaire.interface';

const questionnaireSchema = new Schema<IQuestions>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    liveAlone: { type: Boolean, required: true },
    liveWithParents: { type: Boolean, required: true },
    christian: { type: Boolean, required: true },
    believeJesusIsHead: { type: Boolean, required: true },
    numberOfChildrenWanted: { type: Number, required: true },
    manIsMainProvider: { type: Boolean, required: true },
    menRoleModelsForBoys: { type: Boolean, required: true },
    menSetStandardForDaughters: { type: Boolean, required: true },
    interestsHobbies: { type: String, required: true },
    preferredAgeRange: { type: String, required: true },
    preferredEthnicity: { type: String, required: true },
    preferredPhysique: { type: String, required: true },
    preferredFitnessLevel: { type: String, required: true },

    haveAHome: { type: Boolean },
    stepUpAsFather: { type: Boolean },
    stepUpAsMother: { type: Boolean },
    mothersAreNurturers: { type: Boolean },
    womenMakeHome: { type: Boolean },
    willingToWork: { type: Boolean },
    preferHomesteadingOrUrban: { type: String },
  },
  { timestamps: true }
);

export const Questionnaire = model<IQuestions>(
  'Questionnaire',
  questionnaireSchema
);
