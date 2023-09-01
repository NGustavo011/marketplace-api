import { Controller } from '../../../../../presentation/contracts/controller';
import { AddOrderController } from '../../../../../presentation/controllers/order/add-order/add-order-controller';
import { makeAddOrder } from '../../../usecases/order/add-order/add-order-factory';
import { makeValidateOrderSeller } from '../../../usecases/order/validate-order-seller/validate-order-seller-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeAddOrderValidation } from './add-order-validation-factory';

export const makeAddOrderController = (): Controller => {
	const controller = new AddOrderController(makeAddOrder(), makeValidateOrderSeller(), makeValidateToken(), makeAddOrderValidation());
	return controller;
};
