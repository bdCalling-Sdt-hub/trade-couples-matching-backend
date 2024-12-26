import { model, Schema } from "mongoose";
import { ISubscription, SubscriptionModel } from "./subscription.interface";
import { randomBytes } from "crypto";


const subscriptionSchema = new Schema<ISubscription, SubscriptionModel>(
    {
        customerId: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        package: {
            type: Schema.Types.ObjectId,
            ref: "Package",
            required: true
        },
        txid: {
            type: String,
            required: true
        },
        subscriptionId: {
            type: String,
            required: true
        },
        currentPeriodStart: {
            type: String,
            required: true
        },
        currentPeriodEnd: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["expired", "active", "cancel"],
            default: "active",
            required: true
        },

    },
    {
        timestamps: true
    }
);


subscriptionSchema.pre("save", async function (next) {
    const subscription = this;

    if (subscription.isNew && !subscription.txid) {
        const prefix = "tx_";
        const uniqueId = randomBytes(8).toString("hex");
        subscription.txid = `${prefix}${uniqueId}`;
    }
    next();
});

export const Subscription = model<ISubscription, SubscriptionModel>("Subscription", subscriptionSchema)