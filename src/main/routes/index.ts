import { Router } from 'express';
import { userRoutes } from './user/user-routes';
import { categoryRoutes } from './category/category-routes';

export const router = Router();

router.use('/api', userRoutes, categoryRoutes);
