/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeGetProductController } from '../../factories/controllers/product/get-product/get-product-controller-factory';
import { makeAddProductController } from '../../factories/controllers/product/add-product/add-product-controller-factory';
import { makeEditProductController } from '../../factories/controllers/product/edit-product/edit-product-controller-factory';
import { makeDeleteProductController } from '../../factories/controllers/product/delete/delete-product-controller-factory';

export const productRoutes = Router();

productRoutes.get('/get-product', adaptRoute(makeGetProductController()));
productRoutes.post('/add-product', adaptRoute(makeAddProductController()));
productRoutes.put('/edit-product', adaptRoute(makeEditProductController()));
productRoutes.delete('/delete-product', adaptRoute(makeDeleteProductController()));