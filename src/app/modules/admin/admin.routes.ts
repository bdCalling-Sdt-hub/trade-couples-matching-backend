import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { AdminController } from "./admin.controller";
const router = express.Router();

router.get("/summary", 
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), 
    AdminController.getSummary
);

router.get("/user-activity", 
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), 
    AdminController.userActivitySummary
);

router.get("/subscription", 
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), 
    AdminController.subscriptionSummary
);


export const AdminRoutes = router;