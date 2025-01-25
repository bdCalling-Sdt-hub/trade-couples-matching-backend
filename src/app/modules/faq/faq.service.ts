import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IFaq } from './faq.interface'
import { Faq } from './faq.model'

const createFaqToDB = async (payload: IFaq): Promise<IFaq> => {
  const createFaq = await Faq.create(payload)

  if (!createFaq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created faq!')
  }

  return createFaq
}
const getAllFaqToDB = async (query: Record<string, any>): Promise<{ faqs: [], meta: { page: 0, total: 0 } }> => {
  const { page, limit } = query;
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  const result = await Faq.find()
    .lean()
    .skip(skip)
    .limit(size);
  const count = await Faq.countDocuments()

  const data = {
    faqs: result,
    meta: {
      page: pages,
      total: count
    }
  } as { faqs: [], meta: { page: 0, total: 0 } }

  return data;
};

const updateFaqToDB = async (
  id: string,
  payload: IFaq,
): Promise<IFaq | null> => {
  const faq = await Faq.findOneAndUpdate({ _id: id }, payload, { new: true })
  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Faq doesn't exist!")
  }

  return faq
}

const deleteFaqToDB = async (id: string): Promise<IFaq> => {
  const faq = await Faq.findByIdAndDelete(id)

  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Faq doesn't exist!")
  }

  return faq
}

export const FaqService = {
  createFaqToDB,
  getAllFaqToDB,
  updateFaqToDB,
  deleteFaqToDB,
}
