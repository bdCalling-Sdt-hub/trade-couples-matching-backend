import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ResourcesController } from './resources.controller';
const router = express.Router();

//press
router
  .route('/press')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createPress)
  .get(ResourcesController.getPress)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updatePress);

//affiliate
router
  .route('/affiliate')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createAffiliateProgram)
  .get(ResourcesController.getAffiliateProgram)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updateAffiliateProgram);

//support
router
  .route('/support')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createSupport)
  .get(ResourcesController.getSupport)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updateSupport);

//terms
router
  .route('/terms')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createTerms)
  .get(ResourcesController.getTerms)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updateTerms);

//policy
router
  .route('/policy')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createPolicy)
  .get(ResourcesController.getPolicy)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updatePolicy);

//about
router
  .route('/about')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createAbout)
  .get(ResourcesController.getAbout)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updateAbout);

//safety
router
  .route('/safety')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createSafetyData)
  .get(ResourcesController.getSafetyData)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updateSafetyData);

//cookie
router
  .route('/cookie')
  .post(auth(USER_ROLES.ADMIN), ResourcesController.createCookieData)
  .get(ResourcesController.getCookieData)
  .patch(auth(USER_ROLES.ADMIN), ResourcesController.updateCookieData);

export const ResourcesRoutes = router;
