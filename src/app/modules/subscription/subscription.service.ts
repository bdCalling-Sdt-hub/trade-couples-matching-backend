import { JwtPayload } from "jsonwebtoken";
import { ISubscription } from "./subscription.interface";
import { Subscription } from "./subscription.model";
import stripe from "../../../config/stripe";
import { User } from "../user/user.model";


const subscriptionDetailsFromDB = async (user: JwtPayload): Promise<{ subscription: ISubscription | {} }> => {

    const subscription = await Subscription.findOne({ user: user.id }).populate("package", "title").lean();
    if (!subscription) {
        return { subscription: {} }; // Return empty object if no subscription found
    }

    const subscriptionFromStripe = await stripe.subscriptions.retrieve(subscription.subscriptionId);

    // Check subscription status and update database accordingly
    if (subscriptionFromStripe?.status !== "active") {
        await Promise.all([
            User.findByIdAndUpdate(user.id, { isSubscribed: false }, { new: true }),
            Subscription.findOneAndUpdate({ user: user.id }, { status: "expired" }, { new: true }),
        ]);
    }

    return { subscription };
};


const getSubscriptionListFromDB = async (query: Record<string, any>): Promise<{}> => {

    const { page, limit } = query;
    const pages = parseInt(page as string) || 1;
    const size = parseInt(limit as string) || 10;
    const skip = (pages - 1) * size;

    const subscriptions = await Subscription.find()
        .populate("reportTo", "name email")
        .lean()
        .skip(skip)
        .limit(size)

    const count = await Subscription.countDocuments()

    const data = {
        subscriptions,
        meta: {
            page: pages,
            total: count
        }
    } as { subscriptions: [], meta: { page: 0, total: 0 } }

    return data;
}

export const SubscriptionService = {
    subscriptionDetailsFromDB,
    getSubscriptionListFromDB
}