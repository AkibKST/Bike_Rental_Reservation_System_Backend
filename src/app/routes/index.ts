import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BikeRoutes } from '../modules/bike/bike.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
