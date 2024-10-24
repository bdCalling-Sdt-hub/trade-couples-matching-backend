import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { BioRoutes } from '../app/modules/bio/bio.route';
import { UserRoutes } from '../app/modules/user/user.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/bio',
    route: BioRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
