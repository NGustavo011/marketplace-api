import { AddOrder } from '../../../../../data/usecases/order/add-order/add-order';
import { OrderPrismaRepository } from '../../../../../infra/db/prisma/order/order-prisma-repository';
import { ProductPrismaRepository } from '../../../../../infra/db/prisma/product/product-prisma-repository';
import { GnApiAdapter } from '../../../../../infra/payment/gn-api-adapter/gn-api-adapter';

export const makeAddOrder = (): AddOrder => {
	const productPrismaRepository = new ProductPrismaRepository();
	const gnApiAdapter = new GnApiAdapter();
	const orderPrismaRepository = new OrderPrismaRepository();
	return new AddOrder(productPrismaRepository, gnApiAdapter, orderPrismaRepository);
};
