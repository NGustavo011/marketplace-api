import { GetCategoryContract, GetCategoryParams, GetCategoryReturn } from '../../../../domain/usecases-contracts/category/get-category';
import { GetCategoryRepository } from '../../../repositories-contracts/category/get-category-repository';

export class GetCategory implements GetCategoryContract {
	constructor(private readonly getCategoryRepository: GetCategoryRepository){
	}

	async get (getCategoryParams: GetCategoryParams): Promise<GetCategoryReturn | null>{
		const getCategory = await this.getCategoryRepository.get(getCategoryParams);
		return getCategory;
	}
}