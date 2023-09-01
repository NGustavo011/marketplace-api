import { Controller } from '../../../../../presentation/contracts/controller';
import { DeleteProductController } from '../../../../../presentation/controllers/product/delete-product/delete-product-controller';
import { makeDeleteProduct } from '../../../usecases/product/delete-product/delete-product-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeDeleteProductValidation } from './delete-product-validation-factory';

export const makeDeleteProductController = (): Controller => {
	const controller = new DeleteProductController(makeDeleteProduct(), makeValidateToken(), makeDeleteProductValidation());
	return controller;
};
