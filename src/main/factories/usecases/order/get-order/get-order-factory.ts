import { GetOrder } from '../../../../../data/usecases/order/get-order/get-order';
import { OrderPrismaRepository } from '../../../../../infra/db/prisma/order/order-prisma-repository';

export const makeGetOrder = (): GetOrder => {
	const orderPrismaRepository = new OrderPrismaRepository();
	return new GetOrder(orderPrismaRepository);
};
