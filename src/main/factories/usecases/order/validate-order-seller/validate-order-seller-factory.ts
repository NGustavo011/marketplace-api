import { ValidateOrderSeller } from '../../../../../data/usecases/order/validate-order-seller/validate-order-seller';
import { ValidateOrderSellerContract } from '../../../../../domain/usecases-contracts/order/validate-order-seller';
import { OrderPrismaRepository } from '../../../../../infra/db/prisma/order/order-prisma-repository';

export const makeValidateOrderSeller = (): ValidateOrderSellerContract => {
	const orderPrismaRepository = new OrderPrismaRepository();
	return new ValidateOrderSeller(orderPrismaRepository);
};