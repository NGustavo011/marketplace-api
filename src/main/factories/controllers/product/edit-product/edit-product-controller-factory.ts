import { Controller } from '../../../../../presentation/contracts/controller';
import { EditProductController } from '../../../../../presentation/controllers/product/edit-product/edit-product-controller';
import { makeEditProduct } from '../../../usecases/product/edit-product/edit-product-factory';
import { makeValidateProductPrice } from '../../../usecases/product/validate-product-price/validate-product-price-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeEditProductValidation } from './edit-product-validation-factory';

export const makeEditProductController = (): Controller => {
	const controller = new EditProductController(makeEditProduct(), makeValidateProductPrice(), makeValidateToken(), makeEditProductValidation());
	return controller;
};
