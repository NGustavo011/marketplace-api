import { GetProductContract, GetProductParams, GetProductReturn } from '../../../../domain/usecases-contracts/product/get-product';
import { GetProductRepository } from '../../../repositories-contracts/product/get-product-repository';


export class GetProduct implements GetProductContract {
	constructor(private readonly getProductRepository: GetProductRepository){
	}

	async get (getProductParams: GetProductParams): Promise<GetProductReturn | null>{
		const products = await this.getProductRepository.get(getProductParams);
		return products;
	}
}