import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { QuestionnaireService } from './questionnaire.service';

const answerQuestionnaire = catchAsync(async (req: Request, res: Response) => {
  const data = {
    user: req.user.id,
    ...req.body,
  };
  const result = await QuestionnaireService.answerQuestionnaireToDB(data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Successfully give answer',
    data: result,
  });
});

const getAnswerQuestionnaire = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user.id;
    const result = await QuestionnaireService.getAnswerQuestionnaireFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Successfully retrieved questionnaire answer',
      data: result,
    });
  }
);

const updateAnswerQuestionnaire = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user.id;
    const { ...questionData } = req.body;
    const result = await QuestionnaireService.updateAnswerQuestionnaireToDB(
      user,
      questionData
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Successfully updated questionnaire',
      data: result,
    });
  }
);

export const QuestionnaireController = {
  answerQuestionnaire,
  getAnswerQuestionnaire,
  updateAnswerQuestionnaire,
};
