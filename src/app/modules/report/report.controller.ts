import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReportService } from "./report.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createReport = catchAsync(async (req: Request, res: Response) => {
    const data = {
        user: req.user.id,
        ...req.body,
    };
    const result = await ReportService.createReportToDB(data);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Report Submitted',
        data: result,
    });
});


const getReportList = catchAsync(async (req: Request, res: Response) => {
    const result = await ReportService.getReportListFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Reported Data retrieved Successfully',
        data: result,
    });
});


const blockAndUnblock = catchAsync(async (req: Request, res: Response) => {
    const result = await ReportService.blockAndUnblockToDB(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User Status changed Successfully',
        data: result,
    });
});

export const ReportController = {
    createReport,
    getReportList,
    blockAndUnblock
}