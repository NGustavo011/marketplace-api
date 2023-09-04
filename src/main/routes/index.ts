import { Router } from 'express';
import { userRoutes } from './user/user-routes';

export const router = Router();

router.use('/api', userRoutes);
