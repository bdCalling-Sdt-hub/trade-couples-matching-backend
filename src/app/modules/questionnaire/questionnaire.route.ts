import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireValidation } from './questionnaire.validation';
const router = express.Router();

router.post(
  '/answer',
  auth(USER_ROLES.USER),
  validateRequest(QuestionnaireValidation.createQuestionnaireZodSchema),
  QuestionnaireController.answerQuestionnaire
);

router
  .route('/')
  .get(auth(USER_ROLES.USER), QuestionnaireController.getAnswerQuestionnaire)
  .patch(
    auth(USER_ROLES.USER),
    validateRequest(QuestionnaireValidation.updateQuestionnaireZodSchema),
    QuestionnaireController.updateAnswerQuestionnaire
  );

export const QuestionnaireRoutes = router;
