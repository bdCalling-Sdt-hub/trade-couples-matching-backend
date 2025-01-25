import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SubscriptionService } from "./subscription.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const subscriptionDetails = catchAsync( async(req: Request, res: Response)=>{
    const result = await SubscriptionService.subscriptionDetailsFromDB(req.user);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Subscription Details Retrieved Successfully",
        data: result.subscription
    })
});

const getSubscriptionList = catchAsync( async(req: Request, res: Response)=>{
    const result = await SubscriptionService.getSubscriptionListFromDB(req.query);

    console.log(result);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Subscriptions data Retrieved Successfully",
        data: result
    })
});

export const SubscriptionController = {
    subscriptionDetails,
    getSubscriptionList
}