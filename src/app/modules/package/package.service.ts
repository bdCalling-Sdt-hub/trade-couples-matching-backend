import { IPackage } from "./package.interface";
import { Package } from "./package.model";

const getPackageFromDB = async(paymentType: string): Promise<IPackage[]>=>{
    const query:any = {
        status: "Active"
    }
    if(paymentType){
        query.paymentType = paymentType
    }

    const result = await Package.find(query);
    return result;
}

export const PackageService = {
    getPackageFromDB
}