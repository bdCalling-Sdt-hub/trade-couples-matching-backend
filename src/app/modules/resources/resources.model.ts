import { model, Schema } from 'mongoose';
import RESOURCES_TYPE from '../../../enums/resources';
import { IResources } from './resources.interface';

const resourcesSchema = new Schema<IResources>(
  {
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(RESOURCES_TYPE),
      required: true,
      select: 0,
    },
  },
  { timestamps: true }
);

export const Resources = model<IResources>('Resources', resourcesSchema);
