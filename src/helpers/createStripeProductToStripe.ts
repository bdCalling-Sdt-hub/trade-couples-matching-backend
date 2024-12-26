import { StatusCodes } from "http-status-codes";
import stripe from "../config/stripe";
import ApiError from "../errors/ApiError";

export const createSubscriptionProduct = async (payload: any): Promise<{ productId: string, costOptions: any[] }> => {
    const { name, costOptions } = payload;

    if (!name || !costOptions || !Array.isArray(costOptions)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid payload");
    }

    try {

        const product = await stripe.products.create({
            name: name,
            description: "Dummy Description",
        });

        if (!product) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create product");
        }

        const updatedCostOptions = await Promise.all(
            costOptions.map(async (option: any) => {

                let interval: 'month' | 'year' = 'month';
                let intervalCount = 1;

                // Map duration to interval_count
                switch (option.duration) {
                    case '1 month':
                        interval = 'month';
                        intervalCount = 1;
                        break;
                    case '6 months':
                        interval = 'month';
                        intervalCount = 6;
                        break;
                    case '1 year':
                        interval = 'year';
                        intervalCount = 1;
                        break;
                    default:
                        interval = 'month';
                        intervalCount = 1;
                }


                const price = await stripe.prices.create({
                    unit_amount: Math.round(option.amount * 100),
                    currency: "usd",
                    recurring: { interval: interval, interval_count: intervalCount },
                    product: product.id,
                });

                const paymentLink = await stripe.paymentLinks.create({
                    line_items: [
                        {
                            price: price.id,
                            quantity: 1,
                        },
                    ],
                });

                return {
                    ...option,
                    priceId: price.id,
                    paymentLink: paymentLink.url,
                };
            })
        );

        return { productId: product.id, costOptions: updatedCostOptions };
    } catch (error: any) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error creating subscription product: ${error.message}`);
    }
};