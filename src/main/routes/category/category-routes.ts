/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeGetCategoryController } from '../../factories/controllers/category/get-category/get-category-controller-factory';
import { adaptRoute } from '../../adapters/express-route-adapter';

export const categoryRoutes = Router();

categoryRoutes.get('/get-category', adaptRoute(makeGetCategoryController()));
