import { AddOrder } from '../../../../../data/usecases/order/add-order/add-order';
import { OrderPrismaRepository } from '../../../../../infra/db/prisma/order/order-prisma-repository';

export const makeAddOrder = (): AddOrder => {
	const orderPrismaRepository = new OrderPrismaRepository();
	return new AddOrder(orderPrismaRepository);
};
