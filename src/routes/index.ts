import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { BioRoutes } from '../app/modules/bio/bio.route';
import { BlogRoutes } from '../app/modules/blog/blog.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { FavoriteRoutes } from '../app/modules/favorite/favorite.route';
import { GalleryRoutes } from '../app/modules/gallery/gallery.route';
import { QuestionnaireRoutes } from '../app/modules/questionnaire/questionnaire.route';
import { ResourcesRoutes } from '../app/modules/resources/resources.route';
import { UserRoutes } from '../app/modules/user/user.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bio',
    route: BioRoutes,
  },
  {
    path: '/questionnaire',
    route: QuestionnaireRoutes,
  },
  {
    path: '/gallery',
    route: GalleryRoutes,
  },
  {
    path: '/resources',
    route: ResourcesRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  {
    path: '/favorite',
    route: FavoriteRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
