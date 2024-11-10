import { Types } from 'mongoose';

export type IGallery = {
  user: Types.ObjectId;
  image: string | undefined;
};
