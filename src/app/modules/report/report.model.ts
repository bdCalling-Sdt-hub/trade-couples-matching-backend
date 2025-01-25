import { model, Schema } from "mongoose";
import { IReport, ReportModel } from "./report.interface";

const reportSchema = new Schema<IReport, ReportModel>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        reportTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        reason: {
            type: String,
            required: true
        }
    },
    {  timestamps: true}
);


export const Report = model<IReport, ReportModel>("Report", reportSchema)