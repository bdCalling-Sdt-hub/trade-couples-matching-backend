import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReportController } from './report.controller';
import { ReportValidation } from './report.validation';
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.USER),
        validateRequest(ReportValidation.createReportZodSchema),
        ReportController.createReport
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        ReportController.getReportList
    );


router.patch("/:id",
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ReportController.blockAndUnblock
)

export const ReportRoutes = router;
