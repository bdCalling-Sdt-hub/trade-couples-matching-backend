import { Model, Types } from 'mongoose';

export type IViewMe = {
  user: Types.ObjectId;
  view: Types.ObjectId;
};

export type ViewMeModel = {
  isExistOnViewMeList(user: string, view: string): any;
} & Model<IViewMe>;
