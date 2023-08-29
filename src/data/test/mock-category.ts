import { CategoryModel } from '../../domain/models/category';
import { GetCategoryParams, GetCategoryReturn } from '../../domain/usecases-contracts/category/get-category';
import { GetCategoryRepository } from '../repositories-contracts/category/get-category-repository';

export const mockCategoryModel = (): CategoryModel => ({
	id: 'any_id',
	name: 'any_name',
	description: 'any_description'
});

export const mockGetCategoryParams = (): GetCategoryParams => ({
	id: 'any_id'
});

export const mockGetCategoryRepository = (): GetCategoryRepository => {
	class GetCategoryRepositoryStub implements GetCategoryRepository {
		async get(): Promise<GetCategoryReturn | null>{
			return await Promise.resolve([mockCategoryModel()]);
		}
	}
	return new GetCategoryRepositoryStub();
};