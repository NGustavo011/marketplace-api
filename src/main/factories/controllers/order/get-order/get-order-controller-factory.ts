import { Controller } from '../../../../../presentation/contracts/controller';
import { GetOrderController } from '../../../../../presentation/controllers/order/get-order/get-order';
import { makeGetOrder } from '../../../usecases/order/get-order/get-order-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeGetOrderValidation } from './get-order-validation-factory';

export const makeGetOrderController = (): Controller => {
	const controller = new GetOrderController(makeGetOrder(), makeValidateToken(), makeGetOrderValidation());
	return controller;
};
