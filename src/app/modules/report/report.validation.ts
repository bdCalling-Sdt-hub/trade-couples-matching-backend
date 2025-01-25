import { z } from "zod";

const createReportZodSchema = z.object({
    body: z.object({
        reportTo: z.string({required_error: "Report To User Is required"}),
        reason: z.string({required_error: "Reason in required"})
    })
})

export const ReportValidation = {
    createReportZodSchema
}