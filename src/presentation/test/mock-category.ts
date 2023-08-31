import { mockCategoryModel } from '../../data/test/mock-category';
import { GetCategoryContract, GetCategoryReturn } from '../../domain/usecases-contracts/category/get-category';

export const mockGetCategory = (): GetCategoryContract => {
	class GetCategoryStub implements GetCategoryContract {
		async get (): Promise<GetCategoryReturn | null> {
			return await Promise.resolve([mockCategoryModel()]);
		}
	}
	return new GetCategoryStub();
};