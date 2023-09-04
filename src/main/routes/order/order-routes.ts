/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeGetOrderController } from '../../factories/controllers/order/get-order/get-order-controller-factory';
import { makeAddOrderController } from '../../factories/controllers/order/add-order/add-order-controller-factory';
import { makeEditOrderStatusController } from '../../factories/controllers/order/edit-order-status/edit-order-status-controller-factory';

export const orderRoutes = Router();

orderRoutes.get('/get-order', adaptRoute(makeGetOrderController()));
orderRoutes.post('/add-order', adaptRoute(makeAddOrderController()));
orderRoutes.put('/edit-order-status', adaptRoute(makeEditOrderStatusController()));