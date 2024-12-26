import { model, Schema } from "mongoose";
import { IPackage, PackageModel } from "./package.interface";

const packageSchema = new Schema<IPackage, PackageModel>(
    {
        name: {
            type: String,
            enum: ['Basic', 'Premium'],
            required: true,
            immutable: true
        },
        productId: {
            type: String,
            required: false
        },
        features: [
            {
                type: String,
                required: true
            }
        ],
        paymentLink: {
            type: String,
            required: false
        },
        costOptions: [
            {
                name: String,
                amount: Number,
                duration: {
                    type: String,
                    enum: ['1 month', '6 months', '1 year']
                },
                paymentLink: {
                    type: String,
                    required: false
                }
            }
        ],
        status: {
            type: String,
            enum: ['Active', 'Delete'],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
)

export const Package = model<IPackage, PackageModel>("Package", packageSchema)