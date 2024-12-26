import { model, Schema } from 'mongoose';
import { IViewMe, ViewMeModel } from './viewMe.interface';

const viewMeSchema = new Schema<IViewMe, ViewMeModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
      select: 0,
    },
    view: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Ensure no duplicate favorites
viewMeSchema.index({ user: 1, view: 1 }, { unique: true });

//check exist
viewMeSchema.statics.isExistOnViewMeList = async (
  user: string,
  view: string
) => {
  const isExist = await ViewMe.findOne({
    user: user,
    view: view,
  });
  return !!isExist;
};

export const ViewMe = model<IViewMe, ViewMeModel>(
  'ViewMe',
  viewMeSchema
);
