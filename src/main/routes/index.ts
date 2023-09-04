import { Router } from 'express';
import { userRoutes } from './user/user-routes';
import { categoryRoutes } from './category/category-routes';
import { productRoutes } from './product/product-routes';
import { orderRoutes } from './order/order-routes';

export const router = Router();

router.use('/api', userRoutes, categoryRoutes, productRoutes, orderRoutes);
