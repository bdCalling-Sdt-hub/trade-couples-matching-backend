import { model, Schema } from 'mongoose';
import { IBio } from './bio.interface';

const bioSchema = new Schema<IBio>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    aboutMe: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    bodyShape: {
      type: String,
      required: true,
    },
    educationOn: {
      type: String,
      required: true,
    },
    educationFrom: {
      type: String,
      required: true,
    },
    ethnicity: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    hairColor: {
      type: String,
      required: true,
    },
    eyeColor: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    children: {
      type: String,
      required: true,
    },
    howManyChildren: {
      type: Number,
      default: 0,
    },
    childrenAges: {
      type: [Number],
      default: [],
    },
    searchingRightPartner: {
      type: Boolean,
      required: true,
    },
    wantToLive: {
      type: Boolean,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Bio = model<IBio>('Bio', bioSchema);
