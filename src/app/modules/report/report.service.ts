import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IReport } from "./report.interface";
import { Report } from "./report.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const createReportToDB = async (payload: IReport): Promise<IReport> => {
    if (!mongoose.Types.ObjectId.isValid(payload.reportTo)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID")
    }
    const report = await Report.create(payload);
    if (!report) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Report")
    }
    return report;
}

const getReportListFromDB = async (query: Record<string, any>): Promise<IReport[]> => {

    const { page, limit } = query;
    const pages = parseInt(page as string) || 1;
    const size = parseInt(limit as string) || 10;
    const skip = (pages - 1) * size;

    const reports = await Report.find()
        .populate("reportTo", "name email status")
        .lean()
        .skip(skip)
        .limit(size)

    const count = await Report.countDocuments();

    const data = {
        reports: reports,
        meta: {
            page: pages,
            total: count
        }
    } as any
    return data;
}

const blockAndUnblockToDB = async (id: string): Promise<IReport> => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid USer ID")
    }

    const isExistUser = await User.findById(id).select("status");
    if(!isExistUser){
        throw new ApiError(StatusCodes.BAD_REQUEST, "No User found")
    }

    const updatedUser:any = await User.findByIdAndUpdate(
        {_id: id},
        {status: isExistUser?.status === "ACTIVE" ? "BLOCK" : "ACTIVE"},
        {new: true}
    )

    if (!updatedUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Updated User")
    }

    return updatedUser;
}

export const ReportService = {
    createReportToDB,
    getReportListFromDB,
    blockAndUnblockToDB
}