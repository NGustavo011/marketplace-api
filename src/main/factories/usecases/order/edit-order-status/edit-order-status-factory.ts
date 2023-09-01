import { EditOrderStatus } from '../../../../../data/usecases/order/edit-order-status/edit-order-status';
import { OrderPrismaRepository } from '../../../../../infra/db/prisma/order/order-prisma-repository';

export const makeEditOrderStatus = (): EditOrderStatus => {
	const orderPrismaRepository = new OrderPrismaRepository();
	return new EditOrderStatus(orderPrismaRepository);
};
