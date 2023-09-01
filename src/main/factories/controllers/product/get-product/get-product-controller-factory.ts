import { Controller } from '../../../../../presentation/contracts/controller';
import { GetProductController } from '../../../../../presentation/controllers/product/get-product/get-product-controller';
import { makeGetProduct } from '../../../usecases/product/get-product/get-product-factory';

export const makeGetProductController = (): Controller => {
	const controller = new GetProductController(makeGetProduct());
	return controller;
};
