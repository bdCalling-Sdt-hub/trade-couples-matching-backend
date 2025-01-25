import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IBio } from './bio.interface';
import { Bio } from './bio.model';
import { JwtPayload } from 'jsonwebtoken';
import { Favorite } from '../favorite/favorite.model';

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

  console.log(id);
  const isExistBio = await Bio.findOne({ user: id }).select('-user');
  console.log(isExistBio);
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

  const users: any[] = await Promise.all(filteredPeople.map(async (item: any) => {
    const isBookedMark = await Favorite.findOne({ userId: user?.id, favoriteUserId: item?.user?._id });

    return {
      ...item,
      isFavorite: !!isBookedMark
    }
  }))


  const count = await Bio.countDocuments(whereConditions);

  return {
    peoples: users,
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

  const bio: any = await Bio.findOne({ user: user.id });

  if (!bio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid User")
  }

  const anyConditions = Object.entries({
    country: bio.country,
    region: bio.region,
    eyeColor: bio.eyeColor,
    maritalStatus: bio.maritalStatus,
    occupation: bio.occupation,
  }).reduce((acc, [field, value]) => {
    if (value != null) { // Include only valid fields
      acc.push({ [field]: value });
    }
    return acc;
  }, [] as { [key: string]: any }[]);

  // Use $or instead of $and
  const whereConditions = anyConditions.length > 0 ? { $or: anyConditions } : {};

  const peoples = await Bio.find(whereConditions)
    .skip(skip)
    .limit(size)
    .populate({
      path: "user",
      select: "image name address",
      match: {
        _id: { $ne: user.id }
      }
    })
    .select("user -_id")
    .lean();

  const filteredPeople = peoples.filter((people) => people.user !== null);

  const users: any[] = await Promise.all(filteredPeople.map(async (item: any) => {
    const isBookedMark = await Favorite.findOne({ userId: user?.id, favoriteUserId: item?.user?._id });
    const bio = await Bio.findOne({user: item?.user?._id}).select("age country").lean();
    return {
      ...item,
      ...bio,
      isFavorite: !!isBookedMark
    }
  }))

  return {
    peoples: users,
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
