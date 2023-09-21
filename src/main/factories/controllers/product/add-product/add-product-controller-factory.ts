import { Controller } from '../../../../../presentation/contracts/controller';
import { AddProductController } from '../../../../../presentation/controllers/product/add-product/add-product-controller';
import { makeAddProduct } from '../../../usecases/product/add-product/add-product-factory';
import { makeValidateProductPrice } from '../../../usecases/product/validate-product-price/validate-product-price-factory';
import { makeCheckUserHasPixKey } from '../../../usecases/user/check-user-has-pix-key/check-user-has-pix-key-factory';
import { makeValidateToken } from '../../../usecases/user/validate-token/validate-token-factory';
import { makeAddProductValidation } from './add-product-validation-factory';

export const makeAddProductController = (): Controller => {
	const controller = new AddProductController(makeAddProduct(), makeCheckUserHasPixKey(), makeValidateProductPrice(), makeValidateToken(), makeAddProductValidation());
	return controller;
};
