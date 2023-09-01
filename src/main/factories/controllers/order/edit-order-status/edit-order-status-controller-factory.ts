import { Controller } from '../../../../../presentation/contracts/controller';
import { EditOrderStatusController } from '../../../../../presentation/controllers/order/edit-order-status/edit-order-status-controller';
import { makeEditOrderStatus } from '../../../usecases/order/edit-order-status/edit-order-status-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeEditOrderStatusValidation } from './edit-order-status-validation-factory';

export const makeEditOrderStatusController = (): Controller => {
	const controller = new EditOrderStatusController(makeEditOrderStatus(), makeValidateToken(), makeEditOrderStatusValidation());
	return controller;
};
