import { Model, Types } from "mongoose"

export type IReport = {
    user: Types.ObjectId;
    reportTo: Types.ObjectId;
    reason: string;
}
export type ReportModel = Model<IReport, Record<string, unknown>>