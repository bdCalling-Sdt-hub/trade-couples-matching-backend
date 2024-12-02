import { User } from '../app/modules/user/user.model';
import config from '../config';
import { USER_ROLES } from '../enums/user';
import { logger } from '../shared/logger';

const payload = {
  name: 'Administrator',
  email: config.admin_email,
  gender: 'male',
  role: USER_ROLES.SUPER_ADMIN,
  password: config.admin_pass,
  verified: true,
};

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
