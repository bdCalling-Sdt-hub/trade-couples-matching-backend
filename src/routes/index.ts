import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { BioRoutes } from '../app/modules/bio/bio.route';
import { BlogRoutes } from '../app/modules/blog/blog.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { FavoriteRoutes } from '../app/modules/favorite/favorite.route';
import { GalleryRoutes } from '../app/modules/gallery/gallery.route';
import { QuestionnaireRoutes } from '../app/modules/questionnaire/questionnaire.route';
import { ResourcesRoutes } from '../app/modules/resources/resources.route';
import { SubscriberRoutes } from '../app/modules/subscriber/subscriber.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ViewMeRoutes } from '../app/modules/viewMe/viewMe.route';
import { ChatRoutes } from '../app/modules/chat/chat.route';
import { MessageRoutes } from '../app/modules/message/message.route';
import { PackageRoutes } from '../app/modules/package/package.routes';
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
  {
    path: '/subscriber',
    route: SubscriberRoutes,
  },
  { path: '/viewMe', route: ViewMeRoutes},
  { path: '/chat', route: ChatRoutes},
  { path: '/message', route: MessageRoutes},
  { path: '/package', route: PackageRoutes},
  { path: '/subscription', route: SubscriberRoutes},
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
