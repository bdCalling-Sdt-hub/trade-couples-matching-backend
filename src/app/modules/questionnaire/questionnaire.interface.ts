import { Types } from 'mongoose';

export type IQuestions = {
  user: Types.ObjectId;
  liveAlone: string;
  liveWithParents?: string;
  christian: string;
  believeJesusIsHead: string;
  numberOfChildrenWanted?: string;
  manIsMainProvider: string;
  menRoleModelsForBoys: string;
  menSetStandardForDaughters: string;
  interestsHobbies: string;
  preferredAgeRange: string;
  preferredEthnicity: string;
  preferredPhysique: string;
  preferredFitnessLevel: string;
  haveAHome?: string;
  stepUpAsFather?: string;
  stepUpAsMother?: string;
  mothersAreNurturers?: string;
  womenMakeHome?: string;
  willingToWork?: string;
  preferHomesteadingOrUrban?: string;
};
