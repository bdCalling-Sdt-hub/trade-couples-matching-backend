import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PackageService } from "./package.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getPackage = catchAsync(async(req: Request, res: Response)=>{
    const result = await PackageService.getPackageFromDB(req.query.paymentType as string);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Package Retrieved Successfully",
        data: result
    })
})


export const PackageController = {
    getPackage
}