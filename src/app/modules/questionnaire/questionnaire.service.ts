import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IQuestions } from './questionnaire.interface';
import { Questionnaire } from './questionnaire.model';

const answerQuestionnaireToDB = async (payload: IQuestions) => {
  const isExistQuestionnaireForThatUser = await Questionnaire.findById(
    payload.user
  );
  if (!isExistQuestionnaireForThatUser) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You already answer your question'
    );
  }

  const createQuestionAnswer = await Questionnaire.create(payload);
  if (!createQuestionAnswer) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Unable to submit your answers. Please try again.'
    );
  }

  //update user
  await User.findByIdAndUpdate(
    createQuestionAnswer.user,
    { isAnswered: true },
    { new: true }
  );

  return createQuestionAnswer;
};

const getAnswerQuestionnaireFromDB = async (id: string) => {
  const isExistQuestionnaireForThatUser = await Questionnaire.findOne({
    user: id,
  });
  if (!isExistQuestionnaireForThatUser) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Questionnaire data for this user does not exist.'
    );
  }

  return isExistQuestionnaireForThatUser;
};

const updateAnswerQuestionnaireToDB = async (
  id: string,
  payload: Partial<IQuestions>
) => {
  const isExistQuestionnaireForThatUser = await Questionnaire.findOne({
    user: id,
  });
  if (!isExistQuestionnaireForThatUser) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Questionnaire data for this user does not exist.'
    );
  }

  const updateData = await Questionnaire.findByIdAndUpdate(
    isExistQuestionnaireForThatUser._id,
    payload,
    { new: true }
  );

  return updateData;
};

export const QuestionnaireService = {
  answerQuestionnaireToDB,
  getAnswerQuestionnaireFromDB,
  updateAnswerQuestionnaireToDB,
};
