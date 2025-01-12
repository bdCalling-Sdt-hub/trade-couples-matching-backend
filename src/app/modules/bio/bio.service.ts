import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IBio } from './bio.interface';
import { Bio } from './bio.model';
import { JwtPayload } from 'jsonwebtoken';

const createUserBioToDB = async (payload: IBio) => {
  const isExistBioForThatUser = await Bio.findById(payload.user);
  if (isExistBioForThatUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You already add your bio');
  }

  const createBio = await Bio.create(payload);
  if (!createBio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user about');
  }

  //update user
  await User.findByIdAndUpdate(createBio.user, { isBio: true }, { new: true });

  return createBio;
};

const getUserBioToDB = async (id: string) => {
  const isExistBio = await Bio.findOne({ user: id }).select('-user');
  if (!isExistBio) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Bio data for this user does not exist.'
    );
  }
  return isExistBio;
};

const updateUserBioToDB = async (id: string, payload: Partial<IBio>) => {
  const isExistBio = await Bio.findOne({ user: id }).select('-user');
  if (!isExistBio) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Bio data for this user does not exist.'
    );
  }

  const updateData = await Bio.findByIdAndUpdate(isExistBio._id, payload, {
    new: true,
  });
  return updateData;
};


const findPeopleFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{ peoples: IBio[], meta: { page: number, total: number } }> => {
  const { page, limit, sort, search, ...others } = query;

  const anyConditions = [];

  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  // following conditions
  if (search) {

    const matchingUserIds = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { role: user.gender === "Male" ? "Female" : "Male" },
      ]
    }).distinct("_id");

    if (matchingUserIds.length) {
      anyConditions.push({
        user: { $in: matchingUserIds }
      });
    }
  }

  // apply short option
  const sortOption: any = { createdAt: sort ? -1 : 1 };

  if (Object.keys(others).length) {
    anyConditions.push({
      $and: Object.entries(others).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const whereConditions = anyConditions.length > 0 ? { $and: anyConditions } : {};

  const peoples = await Bio.find(whereConditions)
    .sort(sortOption)
    .skip(skip)
    .limit(size)
    .populate({
      path: "user",
      select: "image name address",
      match: {
        _id: { $ne: user.id },
        gender: { $ne: user.role }
      }
    })
    .lean();

  const filteredPeople = peoples.filter((people) => people.user !== null);


  const count = await Bio.countDocuments(whereConditions);

  return {
    peoples: filteredPeople,
    meta: {
      total: count,
      page: pages
    }
  };

};


const discoverPeopleFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{ peoples: IBio[], meta: { page: number, total: number } }> => {

  const { page, limit } = query;

  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  const bio = await Bio.findOne({ user: user.id });

  const conditions = [
    bio?.country ? { country: bio.country } : null,
    bio?.region ? { region: bio.region } : null,
    bio?.eyeColor ? { eyeColor: bio.eyeColor } : null,
    bio?.maritalStatus ? { maritalStatus: bio.maritalStatus } : null,
    bio?.occupation ? { occupation: bio.occupation } : null,
  ].filter(condition => condition !== null);

  const queryConditions = conditions.length > 0 ? { $or: conditions } : {};

  const peoples = await Bio.find(queryConditions)
    .skip(skip)
    .limit(size)
    .populate({
      path: "user",
      select: "image name address",
      match: {
        _id: { $ne: user.id },
        role: { $ne: user.role }
      }
    })
    .lean();

  const filteredPeople = peoples.filter((people) => people.user !== null);

  return {
    peoples: filteredPeople,
    meta: {
      total: filteredPeople?.length,
      page: pages
    }
  };

};

export const BioService = {
  createUserBioToDB,
  getUserBioToDB,
  updateUserBioToDB,
  findPeopleFromDB,
  discoverPeopleFromDB
};
