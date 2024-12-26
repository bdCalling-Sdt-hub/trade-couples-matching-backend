import { Package } from '../app/modules/package/package.model';
import { User } from '../app/modules/user/user.model';
import config from '../config';
import { USER_ROLES } from '../enums/user';
import { createSubscriptionProduct } from '../helpers/createStripeProductToStripe';
import { logger } from '../shared/logger';

const payload = {
  name: 'Administrator',
  email: config.admin_email,
  gender: 'Male',
  role: USER_ROLES.SUPER_ADMIN,
  password: config.admin_pass,
  verified: true,
};


const packagePayload:any = [
  {
    name: 'Basic',
    costOptions: [],
    features: [
      'Create a profile',
      'Browse up to 10 profiles/day',
      'Basic matchmaking (age and location)',
      'Limited messaging (3-5 messages/day)',
      'Profile creation guidance',
    ]
  },
  {
    name: 'Premium',
    costOptions: [
      {
        name: "Monthly",
        duration: '1 month',
        amount: 14.99,
      },
      {
        name: "6 Month Plan",
        duration: '6 months',
        amount: 79.99,
      },
      {
        name: "Annual Plan",
        duration: '1 year',
        amount: 139.99,
      },
    ],
    features: [
      'Unlimited profile browsing',
      'Unlimited messaging',
      'Advanced matchmaking filters and algorithms focused on shared values, lifestyle, and long-term goals',
      'Ability to favorite and save matches',
      'Boosted visibility in searches to highlight profiles of premium members',
      'Access to curated content, including relationship tips rooted in traditional values',
      'Early access to new features as they are introduced',
    ],
  },
];

export const seedAdmin = async () => {

  const isExistAdmin = await User.findOne({
    email: config.admin_email,
    role: USER_ROLES.SUPER_ADMIN,
  });
  if (!isExistAdmin) {
    await User.create(payload);
    logger.info('🎀 Admin account created successfully');
  }
};


export const seedPackage = async () => {

  const isExistAdmin = await Package.find({name : { $in: ['Basic', 'Premium'] }});

  if (!isExistAdmin.length) {
    const subscription = await createSubscriptionProduct(packagePayload[1]);

    if(subscription){
      packagePayload[1].costOptions = subscription.costOptions
      packagePayload[1].productId = subscription.productId
    }

    if(subscription.costOptions && subscription.productId){
      await Package.insertMany(packagePayload);
      logger.info('🎀 Package created successfully');
    }

  }else{
    logger.info('🎀 Package Already created successfully');
  }

};