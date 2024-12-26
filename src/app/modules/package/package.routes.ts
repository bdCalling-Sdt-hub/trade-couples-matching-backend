import express from "express";
import { PackageController } from "./package.controller";
const router = express.Router()

router
    .route("/")
    .get(PackageController.getPackage)

export const PackageRoutes = router;