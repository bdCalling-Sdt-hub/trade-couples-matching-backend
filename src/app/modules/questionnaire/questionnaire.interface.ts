import { Types } from 'mongoose';

export type IQuestions = {
  user: Types.ObjectId;
  liveAlone: boolean;
  liveWithParents: boolean;
  christian: boolean;
  believeJesusIsHead: boolean;
  numberOfChildrenWanted: number;
  manIsMainProvider: boolean;
  menRoleModelsForBoys: boolean;
  menSetStandardForDaughters: boolean;
  interestsHobbies: string;
  preferredAgeRange: string;
  preferredEthnicity: string;
  preferredPhysique: string;
  preferredFitnessLevel: string;

  haveAHome?: boolean;
  stepUpAsFather?: boolean;
  stepUpAsMother?: boolean;
  mothersAreNurturers?: boolean;
  womenMakeHome?: boolean;
  willingToWork?: boolean;
  preferHomesteadingOrUrban?: string;
};
