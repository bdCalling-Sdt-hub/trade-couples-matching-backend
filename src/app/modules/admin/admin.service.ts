import { Subscriber } from "../subscriber/subscriber.model"
import { Subscription } from "../subscription/subscription.model";
import { User } from "../user/user.model"

const getSummaryFromDB = async () => {
    const totalUserCount = await User.countDocuments({ role: "USER" });
    const totalSubscriberCount = await Subscriber.countDocuments();
    const total = await Subscription.aggregate([
        {
            $group: {
                _id: null,
                totalIncome: { $sum: "$price" },
            },
        },
    ]);

    // Extract the totalIncome value
    const totalIncome = total.length > 0 ? total[0].totalIncome : 0;

    return { totalUserCount, totalSubscriberCount, totalIncome }
}

const userActivitySummaryFromDB = async () => {

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Month names array
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create an array of months with total initialized to 0
    let users: { month: string; total: number }[] = [];
    users = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i], // Use month name directly from the array
        total: 0,
    }));

    // Calculate view statistics based on query
    const userStatistics = await User.aggregate([
        {
            $match: {
                role: "USER",
                createdAt: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$createdAt" }
                },
                total: { $sum: 1 }
            }
        }
    ]);

    // Update daysArray with the calculated statistics
    userStatistics.forEach((stat: any) => {
        const dayIndex = parseInt(stat._id.day) - 1;
        if (dayIndex < users.length) {
            users[dayIndex].total = stat.total;
        }
    });

    return users;
}


const subscriptionSummaryFromDB = async () => {

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Month names array
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create an array of months with total initialized to 0
    let subscriptions: { month: string; total: number }[] = [];
    subscriptions = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i], // Use month name directly from the array
        total: 0,
    }));

    // Calculate view statistics based on query
    const subscriptionStatistics = await Subscription.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$createdAt" }
                },
                total: { $sum: 1 }
            }
        }
    ]);

    // Update daysArray with the calculated statistics
    subscriptionStatistics.forEach((stat: any) => {
        const dayIndex = parseInt(stat._id.day) - 1;
        if (dayIndex < subscriptions.length) {
            subscriptions[dayIndex].total = stat.total;
        }
    });

    return subscriptions;
}


export const AdminService = {
    getSummaryFromDB,
    userActivitySummaryFromDB,
    subscriptionSummaryFromDB
}