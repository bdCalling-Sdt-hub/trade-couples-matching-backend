import { model, Schema } from 'mongoose';
import { IGallery } from './gallery.interface';

const gallerySchema = new Schema<IGallery>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Gallery = model<IGallery>('Gallery', gallerySchema);
