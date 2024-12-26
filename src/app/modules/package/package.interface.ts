import { Model } from "mongoose";

interface ICostOptions {
    name: String;
    amount: Number;
    duration: '1 month' | '6 months' | '1 year';
    paymentLink?: string;
}


export type IPackage = {
    name: 'Basic' | 'Premium';
    price: Number;
    productId?: String;
    features: [string];
    costOptions: [ICostOptions];
    paymentLink?: string;
    status: 'Active' | 'Delete';
}

export type PackageModel = Model<IPackage, Record<string, unknown>>;