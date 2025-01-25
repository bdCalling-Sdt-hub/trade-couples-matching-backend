import { Response, Request } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getSummary = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getSummaryFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Summery Data Retrieved ",
        data: result
    })
})

const userActivitySummary = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.userActivitySummaryFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Summery Data Retrieved ",
        data: result
    })
})


const subscriptionSummary = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.subscriptionSummaryFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Subscription Data Retrieved ",
        data: result
    })
})

export const AdminController = {
    getSummary,
    userActivitySummary,
    subscriptionSummary
}