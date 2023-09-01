import { Controller } from '../../../../../presentation/contracts/controller';
import { GetCategoryController } from '../../../../../presentation/controllers/category/get-category/get-category-controller';
import { makeGetCategory } from '../../../usecases/category/get-category/get-category-factory';

export const makeGetCategoryController = (): Controller => {
	const controller = new GetCategoryController(makeGetCategory());
	return controller;
};
